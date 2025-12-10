# Griot & Grits Website + Admin Portal

This repository hosts the public marketing site for Griot & Grits and the new admin portal used to manage the digital preservation backend. The admin experience lives under `/admin` inside the Next.js App Router and connects to the FastAPI preservation service delivered in `griot-and-grits-backend`.

## What’s Included

- Public marketing experience (`/`)
- Admin dashboard with quick actions
- Artifact management (list, detail view, ingestion form)
- Preservation metadata panels (storage locations, events, fixity)
- Archive package workflow: draft → upload → confirm
- GitHub / development auth scaffolding via NextAuth
- React Query data layer, React Hook Form + Zod validation helpers

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (ships with Node) or an alternative package manager
- Access to the preservation API (default base URL `http://localhost:8009`)
- GitHub OAuth credentials (production) or a development token (local testing)

## Installation

Install dependencies after cloning:

```bash
npm install
```

Run the development server:

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

### GoFundMe Donation Integration

The GoFundMe donation section on the main page can be configured and controlled using environment variables.

**Required API Credentials (for real-time campaign data):**
```bash
export GOFUNDME_CLIENT_ID=your-classy-client-id       # Required: Your Classy API client ID
export GOFUNDME_CLIENT_SECRET=your-classy-secret      # Required: Your Classy API client secret
```

**Optional Configuration:**
```bash
export GOFUNDME_CAMPAIGN_ID=731313     # Default campaign ID
export FEATURE_GOFUNDME=true           # Enable/disable the feature (default: enabled)
export GOFUNDME_USE_EMBEDDED=false     # Use embedded modal vs external links (default: false - external links)
export GOFUNDME_REDIRECT_URI=http://localhost:3000/oauth/callback  # OAuth redirect URI (not currently used)
```

**To use embedded donation modal:**
```bash
export GOFUNDME_USE_EMBEDDED=true      # Opens donation form in modal on your site
```

**To disable the GoFundMe section:**
```bash
export FEATURE_GOFUNDME=false
```

**For deployment platforms:**

- **Vercel**: Add environment variables in the Vercel dashboard:
  - `GOFUNDME_CLIENT_ID=your-classy-client-id` (**Required** for real-time data)
  - `GOFUNDME_CLIENT_SECRET=your-classy-secret` (**Required** for real-time data)
  - `FEATURE_ASK_THE_GRIOT=false` (to disable Ask the Griot)
  - `GOFUNDME_CAMPAIGN_ID=your-campaign-id` (to set your campaign)
  - `FEATURE_GOFUNDME=false` (to disable GoFundMe section)
  - `GOFUNDME_USE_EMBEDDED=true` (to use embedded modal instead of external links)

- **Netlify**: Add environment variables in site settings:
  - `GOFUNDME_CLIENT_ID=your-classy-client-id` (**Required**)
  - `GOFUNDME_CLIENT_SECRET=your-classy-secret` (**Required**)
  - `FEATURE_ASK_THE_GRIOT=false`
  - `GOFUNDME_CAMPAIGN_ID=your-campaign-id`
  - `FEATURE_GOFUNDME=false`
  - `GOFUNDME_USE_EMBEDDED=true`

- **Docker**: Pass environment variables when running the container:
  ```bash
  docker run -e GOFUNDME_CLIENT_ID=your-classy-client-id \
             -e GOFUNDME_CLIENT_SECRET=your-classy-secret \
             -e FEATURE_ASK_THE_GRIOT=false \
             -e GOFUNDME_CAMPAIGN_ID=your-campaign-id \
             -e FEATURE_GOFUNDME=true \
             -e GOFUNDME_USE_EMBEDDED=true \
             your-app
  ```

- **Railway/Render**: Add environment variables in the platform dashboard

**Notes:**
- Feature flags are evaluated server-side during page rendering for security
- Changes require a deployment/restart to take effect
- **GoFundMe API Credentials**:
  - **Required** for real-time campaign data (current amount raised, donor count, etc.)
  - Without credentials, the GoFundMe section will show fallback/default values
  - Credentials are from Classy API (GoFundMe's partner platform for organizations)
- **GoFundMe Default**: External links (opens `https://give.griotandgrits.org/campaign/731313/donate` in new window)
- **GoFundMe Embedded**: Modal overlay with embedded donation form (when `GOFUNDME_USE_EMBEDDED=true`)
- If environment variables are not set, features default to enabled with campaign ID 731313
- When disabled, the respective features will not appear on the website

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
