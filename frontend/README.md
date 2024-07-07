# MyPerf Frontend

The frontend of MyPerf is built with React, styled using TailwindCSS and Material Tailwind. This document provides instructions for setting up and running the frontend application.

## Technologies Used

- React
- TailwindCSS
- Material Tailwind

## Installation and Setup

### Local Development

#### Prerequisites

Ensure you have Node.js and Yarn installed on your system.

#### Steps

1. Install the dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn start
```

The application will be available at <http://localhost:3000>.

### Docker Development

#### Prerequisites

Ensure you have Docker installed on your system.

#### Steps

1. Build the Docker image:

```bash
docker build -t myperf-frontend .
```

2. Start the application:

```bash
docker run -p 3000:3000 myperf-frontend
```

The application will be available at <http://localhost:3000>.

## Additional Information

For more details on TailwindCSS and Material Tailwind, refer to their documentation:

- [TailwindCSS](https://tailwindcss.com/docs)

- [Material Tailwind](https://material-tailwind.com/docs/quick-start)
