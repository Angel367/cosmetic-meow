# Use an official Python runtime as a parent image
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /backend

# Install dependencies
COPY requirements.txt /backend/
ENV PIP_TIMEOUT=100
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /code/
COPY cosmetic_meow_backend/* /backend/

# Run migrations
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py import_data

# Specify the command to run on container start
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]