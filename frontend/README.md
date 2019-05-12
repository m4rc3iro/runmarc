# Runmarc Frontend

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production Build and Deployment

Docker configuration available to build and run the application into a Docker container:

- `docker build --rm -t frontend .`
- `docker run -d --name frontend -p 80:80 frontend`

To access Docker container run the following command: `docker exec -it frontend /bin/sh`

# Environmental Variables

Located under `src/environments`. Development and Production ready configuration.
