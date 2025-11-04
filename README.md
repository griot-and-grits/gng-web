This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Feature Flags

This project uses server-side feature flags to control the availability of certain features in production.

### Ask the Griot Feature

The "Ask the Griot" AI chatbot feature on the Collection page can be enabled or disabled using an environment variable.

**To enable the feature (default behavior):**
```bash
export FEATURE_ASK_THE_GRIOT=true
```

**To disable the feature:**
```bash
export FEATURE_ASK_THE_GRIOT=false
```

**For deployment platforms:**

- **Vercel**: Add `FEATURE_ASK_THE_GRIOT=false` to your environment variables in the Vercel dashboard
- **Netlify**: Add `FEATURE_ASK_THE_GRIOT=false` to your environment variables in site settings
- **Docker**: Pass the environment variable when running the container:
  ```bash
  docker run -e FEATURE_ASK_THE_GRIOT=false your-app
  ```
- **Railway/Render**: Add `FEATURE_ASK_THE_GRIOT=false` to your environment variables in the platform dashboard

**Notes:**
- Feature flags are evaluated server-side during page rendering for security
- Changes require a deployment/restart to take effect
- If the environment variable is not set, the feature defaults to enabled
- When disabled, the "Ask the Griot" button and chat interface will not appear on the Collection page

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
