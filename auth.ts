import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

const normalizeList = (value?: string) =>
    (value ?? '')
        .split(',')
        .map((entry) => entry.trim().toLowerCase())
        .filter(Boolean);

const allowedEmails = normalizeList(process.env.ADMIN_ALLOWED_EMAILS);
const allowedLogins = normalizeList(process.env.ADMIN_ALLOWED_GITHUB_LOGINS);

export const isGitHubConfigured =
    Boolean(process.env.GITHUB_CLIENT_ID) && Boolean(process.env.GITHUB_CLIENT_SECRET);

export const devBypassEnabled =
    process.env.ADMIN_DEV_BYPASS === 'true' || !isGitHubConfigured;

const providers = [];

const authSecret =
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV !== 'production' ? 'dev-secret' : undefined);

if (isGitHubConfigured) {
    providers.push(
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
            authorization: { params: { scope: 'read:user user:email' } },
            profile(profile) {
                return {
                    id: profile.id?.toString() ?? '',
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    login: profile.login,
                };
            },
        }),
    );
}

if (providers.length === 0) {
    providers.push(
        Credentials({
            id: 'dev-credentials',
            name: 'Development',
            credentials: {
                token: { label: 'Access Token', type: 'text', placeholder: 'Enter dev token' },
            },
            async authorize(credentials) {
                const requiredToken = process.env.ADMIN_DEV_TOKEN;

                if (requiredToken) {
                    if (credentials?.token === requiredToken) {
                        return { id: 'dev-admin', name: 'Dev Admin', email: 'dev-admin@example.com' };
                    }
                    return null;
                }

                return { id: 'dev-admin', name: 'Dev Admin', email: 'dev-admin@example.com' };
            },
        }),
    );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    trustHost: true,
    secret: authSecret,
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === 'dev-credentials') {
                return true;
            }

            if (devBypassEnabled) {
                return true;
            }

            const githubProfile = profile as { email?: string; login?: string } | null;
            const email = githubProfile?.email?.toLowerCase() ?? user?.email?.toLowerCase();
            const login = githubProfile?.login?.toLowerCase();

            if (allowedEmails.length === 0 && allowedLogins.length === 0) {
                return true;
            }

            if (email && allowedEmails.includes(email)) {
                return true;
            }

            if (login && allowedLogins.includes(login)) {
                return true;
            }

            return false;
        },
        async jwt({ token, profile, user }) {
            if (profile && 'login' in profile) {
                token.githubLogin = (profile as { login?: string }).login;
            }

            if (user?.email) {
                token.email = user.email;
            }

            token.role = 'admin';
            token.devBypass = devBypassEnabled;

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email ?? session.user.email ?? null;
                session.user.role = token.role ?? 'admin';
                session.user.githubLogin = token.githubLogin;
            }

            session.devBypass = token.devBypass === true;

            return session;
        },
    },
    pages: {
        signIn: '/admin/sign-in',
    },
});
