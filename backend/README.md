# Runmarc Backend

## Development

To run in development mode:

- `node server.js`
- `supervisor server.js`
- `pm2 start server.js --watch`

## Production

To run in production, execute `git push heroku master` command. This will push the latest changes into Heroku, build the app and start it automatically.

# Environmental Variables

Since backend environmental variables contain secrets, they haven't been versioned in Git. Therefore, an `.env` file needs to be created in this directory in order to run the backend. MongoDB, ITRA profile connections, etc., won't work without the right parameters.

- MONGODB_USER, MONGODB_PASS, MONGODB_BASE_URI
- ITRA_USERNAME, ITRA_PASSWORD
- CAPTCHA_SECRET_KEY
- AUTH_SECRET_KEY
- API_ADMIN_TOKEN
- SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD

**Note** Check on 1Password for secret key values (both Dev & Prod).

# Runmarc API's

## Comments, Feedback Specific APIs

- GET  - /api/comments
- POST - /api/comments
- GET  - /api/captcha/verify -> To validate Google Captcha key
