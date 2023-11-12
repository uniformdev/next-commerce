# Next.js Commerce enabled by Uniform

This starter is based on the latest Next.js Commerce template and built with Next.js 14 and App Router.

Pre-deployed demo can be found [here](https://nextjscommerceuniform.vercel.app/)

In addition to the goodness Next.js Commerce provides, this starter provides the following benefits for marketers and merchandizers:

- Visual in-line editing of content in Uniform
- Dynamic page layout control without code
- Integrated edge personalization and A/B testing
- Dynamic route control without code (including Product Detail Pages)
- Ability to connect to a couple of dozen of Headless CMS and Commerce catalog APIs, full list [here](https://docs.uniform.app/docs/integrations).

## Docs & Resources

Video walkthrough: check out the YouTube stream [here](https://www.youtube.com/live/4IWDwcecIxg?si=NcnbBKlgsJtAjis7).

If you'd like to learn how this app is put together, check out this [tutorial](https://docs.uniform.app/docs/learn/tutorials/nextjs-app-router) from Uniform.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

See `.env.example` as a reference:

```bash
UNIFORM_API_KEY=
UNIFORM_PROJECT_ID=
UNIFORM_PREVIEW_SECRET=nextcommerce

COMPANY_NAME="Uniform"
TWITTER_CREATOR="@uniformdev"
TWITTER_SITE="https://uniform.dev"
SITE_NAME="JavaDrip.js"

```

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm push
pnpm dev
```

> In order to run `pnpm push`, your `UNIFORM_API_KEY` must have the Developer role permissions.

Your app should now be running on [localhost:3000](http://localhost:3000/).