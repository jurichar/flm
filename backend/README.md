# MyPerf Backend

The backend of MyPerf is built with Django and uses PostgreSQL as the database. This document provides instructions for setting up and running the backend application.

## Technologies Used

- Django
- Django Rest Framework
- PostgreSQL

## Installation and Setup

### Local Development

#### Prerequisites

Ensure you have Python and PostgreSQL installed on your system.

#### Steps

1. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate
```

2. Install the dependencies:

```bash
pip install -r requirements.txt
```

3. Run the migrations:

```bash
python manage.py migrate
```

4. Start the development server:

```bash
python manage.py runserver
```

The application will be available at <http://localhost:8000>.

### Docker Development

#### Prerequisites

Ensure you have Docker installed on your system.

#### Steps

1. Build the Docker image:

```bash
docker build -t myperf-backend .
```

2. Start the application:

```bash
docker run -p 8000:8000 myperf-backend
```

The application will be available at <http://localhost:8000>.

## Additional Information

For more details on Django and Django Rest Framework, refer to their documentation:

- [Django](https://docs.djangoproject.com/en/4.2/)

- [DRF](https://www.django-rest-framework.org/)
