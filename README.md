# React + TypeScript + Vite Template Documentation

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR). Below, you'll find detailed instructions on how to build, run, and manage this application using Docker and Docker Compose. Additionally, this template uses Nginx as the production server inside docker and Mock Service Worker (MSW) for mocking APIs during development.

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

- `src/`: Contains the React application source files.
- `public/`: Contains static files.
- `Dockerfile`: Defines the Docker image for the application.
- `compose.yml`: Defines the services for Docker Compose.
- `nginx.conf`: Configuration file for Nginx.

## Building the Docker Image

To build the Docker image for this project, run the following command in your terminal:

```sh
docker build -t js-example:latest .
```

This command creates a Docker image named `js-example` with the tag `latest`.

## Development: Using Docker Compose

Docker Compose simplifies the management of multi-container applications. To start the application using Docker Compose, run:

```sh
docker-compose up
```

This command uses the `compose.yml` file to start the defined services. The application will be available at `http://localhost:3000`.

## Running the Production Server

To run the production server using Docker, execute the following command:

```sh
docker run -it --rm -e PORT=80 -p 3000:80 js-example
```

See dockerfile for list of available environment variables in production stage.

This command starts a container from the `js-example` image, maps port 80 inside the container to port 3000 on your host machine, and runs the server.

You can access the application by navigating to `http://localhost:3000`.

### Nginx as the Production Server

The production server uses Nginx to serve the built React application. Nginx is configured via the `nginx.conf` file, which ensures efficient serving of static files and handles routing.

## Development Workflow

### Hot Module Replacement (HMR)

This template is configured to use Vite's HMR, allowing for a smooth development experience with instant updates to the application as you make changes.

### Mock Service Worker (MSW)

[MSW] is used for mocking API calls during development. It allows you to create and intercept network requests, which can be useful for testing and development without relying on actual backend services.

### Common Commands

Here are some useful commands for development and management:

- **Install dependencies:**

  ```sh
  npm install
  ```

- **Start the development server:**

  ```sh
  npm run dev
  ```

- **Build the project:**

  ```sh
  npm run build
  ```

- **Preview the production build:**
  ```sh
  npm run serve
  ```

Normally, you wouldn't need this since everything is configured already via docker.

### Customization

You can customize the setup according to your project's needs. Here are some common customization points:

- **Vite Config:**
  Modify `vite.config.ts` to change Vite's configuration.

- **TypeScript Config:**
  Modify `tsconfig.json` to adjust TypeScript settings.

- **React Components:**
  Add or modify components in the `src/` directory to build your application.

- **Nginx Config:**
  Modify `nginx.conf` to adjust Nginx settings for the production server.

- **MSW Handlers:**
  Modify `src/mocks/handlers.ts` to define API mocking rules.

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure Docker and Docker Compose are installed and running.
- Verify that the Docker image builds successfully without errors.
- Check for port conflicts on your machine.

[msw]: https://mswjs.io/
