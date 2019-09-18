# Runmarc

## Source Code

Download source code running the following command: `git clone https://m4rc3iro@bitbucket.org/m4rc3iro/runmarc.git`

## Build and Deployment

### Development

#### Frontend

- Navigate to the project frontend directory by executing `cd runmarc/frontend`
- Run the `ng serve` command
- Navigate to `http://localhost:4200/`

#### Backend

- Navigate to the project frontend directory by executing `cd runmarc/backend`
- Run `npm install` to download all the project dependencies
- Run the `supervisor server.js` command

### Production

In order to build and deploy the application into DigitalOcean:

1. SSH into Digital Ocean's server: `ssh root@134.209.239.31` (pass in 1Password)
1. [Optional] Clone repository -`git clone https://m4rc3iro@bitbucket.org/m4rc3iro/runmarc.git`
1. [Optional] Navigate to application's folder and run `git pull` to initialise/update the repo
1. [Optional] Create an `runmarc/frontend/src/environments/environment.prod.ts` environmental properties file with all the required secrets (see 1Password)
1. [Optional] Create an `runmarc/backend/.env-prod` environmental properties file with all the required secrets (see 1Password)
1. Build and spin up the environment by running `docker-compose build && docker-compose up -d`
1. [Optional] Clean up old container images, etc. by running `docker system prune`
1. Navigate to `http://134.209.239.31/`

## Change Logs

### 1.0.0

- Initial version of the website, which basically offers support for running on a production environment (Heroku).
- Only Introduction functionality available.
