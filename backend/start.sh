#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
sleep 5

echo "Running makemigrations..."
./manage.py makemigrations

echo "Running migrations..."
./manage.py migrate

echo "Loading fixtures..."
python manage.py loaddata fixtures/data.json

echo "Starting server..."
./manage.py runserver 0.0.0.0:8000

# echo "Server started!"
