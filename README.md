# Agarwalgatiwaypackers

Chennai-focused landing page for Agarwalgatiwaypackers with a Nodemailer enquiry form backend.

## Development

1. Install dependencies:
   `npm install`
2. Create local environment file:
   `cp .env.example .env`
3. Update `.env` with your SMTP credentials and receiver email.
4. Start the development server:
   `npm run dev`
5. Open:
   `http://127.0.0.1:3000`

## Available Scripts

- `npm run dev`
  Starts the local server in watch mode for backend and `.env` changes.
- `npm start`
  Starts the local server once.
- `npm run check`
  Runs syntax checks for `server.js` and `main.js`.

## Project Structure

- `index.html`
  Landing page markup and Tailwind-based design.
- `main.js`
  Frontend interactions and form submission logic.
- `server.js`
  Static file server and `/api/enquiry` Nodemailer endpoint.
- `.env.example`
  Example mail and server configuration.

## Notes

- Do not open `index.html` directly with `file://`; the enquiry form requires the local server.
- Keep `.env` private. It is ignored by git.
- Static file changes in `index.html` and `main.js` do not need a server restart; refresh the browser.
