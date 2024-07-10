# Getting Started with Freelance-manager

Freelance-manager is a full-stack application designed to manage and visualize performance metrics. The project utilizes Django for the backend, React for the frontend, TailwindCSS for styling, and Docker for containerization.

## Technologies Used

- Django
- Django Rest Framework
- React
- TailwindCSS
- Material Tailwind
- PostgreSQL
- Docker
- Docker Compose

## Installation and Setup

Clone the Repository

```bash
git clone https://github.com/jurichar/freelance-manager.git
cd freelance-manager
```

Running the Application

> :rocket: If this is the first time :rocket:

```bash
cd frontend
yarn install
cd ..
```

1. Build the Docker images:

```bash
docker-compose build
```

2. Start the application:

```bash
docker-compose up
```

3. Stop the application and remove containers:

```bash
docker-compose down
```

## Directory Structure

- `frontend`: Contains the React frontend application. ([README](frontend/README.md))

- `backend`: Contains the Django backend application. ([README](backend/README.md))

- `data`: Contains PostgreSQL data. This directory is created when the application is started.

## Additional Information

For detailed instructions on setting up and running the frontend and backend, refer to their respective README files in the frontend and backend directories.