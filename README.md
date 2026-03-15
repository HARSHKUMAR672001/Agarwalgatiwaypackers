# Agarwalgatiwaypackers

Next.js + TypeScript + Tailwind CSS landing page for Agarwal Gatiway Packers and Movers, focused on Chennai SEO and lead generation.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Nodemailer

## Development

1. Install dependencies:
   `npm install`
2. Create local environment file:
   `cp .env.example .env`
3. Update `.env` with your SMTP credentials and receiver email.
4. Start the development server:
   `npm run dev`
5. Open:
   `http://localhost:3000`

## Available Scripts

- `npm run dev`
  Starts the Next.js development server.
- `npm run build`
  Builds the production app.
- `npm start`
  Starts the production server after build.
- `npm run check`
  Runs the TypeScript type check.

## Important Files

- `app/page.tsx`
  Main Chennai landing page.
- `components/enquiry-form.tsx`
  Client-side enquiry form with validation.
- `app/api/enquiry/route.ts`
  Nodemailer-powered API route for form submissions.
- `lib/site-content.ts`
  Reusable SEO content, locality lists and section data.
- `.env.example`
  Environment variable template.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`
- `MAIL_FROM`
- `ALLOWED_ORIGINS`

## Vercel

- Deploy the same project to Vercel.
- Add the environment variables from `.env.example` in the Vercel dashboard.
- The site and the API route will work on the same domain, so the form can post to `/api/enquiry`.
