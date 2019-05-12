# Runmarc

## Source Code

Download source code running the following command: `git clone https://m4rc3iro@bitbucket.org/m4rc3iro/runmarc.git`

## Build and Deployment

### Development

Docker Compose configuration available to build and run the application into Docker containers. To build and deploy the application run the following command: `docker-compose up`. Navigate to `http://localhost/`

The application

### Production

In order to build and deploy the application into DigitalOcean:

1. SSH into Digital Ocean's server: `ssh root@134.209.239.31` (pass in 1Password)
1. Navigate to application's folder and run `git pull`
1. Build and spin up the environment by running `docker-compose up`
1. Navigate to `http://134.209.239.31/`

## Change Logs

### 1.0.0

- Initial version of the website, which basically offers support for running on a production environment (Heroku).
- Only Introduction functionality available.
