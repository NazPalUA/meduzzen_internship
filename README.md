# Meduzzen Internship Project

This project is part of the Meduzzen internship program. It's a modern web application built with Next.js and Material-UI, following the Feature-Sliced Design (FSD) architecture. The application is containerized using Docker for easy deployment and consistent development environments.

## Technologies Used

- Next.js 14
- React 18
- Material-UI 6
- TypeScript
- Docker

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Docker](https://docs.docker.com/get-docker/)
- npm (usually comes with Node.js)

## Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd meduzzen_internship
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.sample` to `.env.local`
   - Modify the variables as needed

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Running the Application with Docker

Docker is used to ensure consistent environments across development and production. To run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t meduzzen_internship_app .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 meduzzen_internship_app
   ```

3. Access the application:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where the Docker container is running.

Alternatively, you can list and stop the container:

```bash
docker ps   # List running containers
docker stop <container_id>
```

## Project Structure

This project follows the Feature-Sliced Design (FSD) architecture, which organizes code into layers based on their

- `app/`: Next.js app directory containing pages and layouts
- `public/`: Static files served by Next.js
- `src/`: Source code directory
  - `entities/`: Business entities (e.g., User, Product)
  - `features/`: User interactions and business processes
  - `widgets/`: Composite components combining entities and features
  - `shared/`: Reusable components, utilities, and configs
    - `api/`: API-related code
    - `config/`: Configuration files
    - `lib/`: Shared libraries and utilities
    - `ui/`: Reusable UI components

Each feature, entity, or widget may contain its own set of files:

- `model/`: Business logic and state management
- `ui/`: React components
- `api/`: API integration
- `config/`: Feature-specific configurations
- `lib/`: Feature-specific utilities

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Runs ESLint to check for code quality issues
