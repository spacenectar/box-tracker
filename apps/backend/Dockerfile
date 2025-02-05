# Use an official Python image
FROM python:3.12

# Install system dependencies
RUN apt-get update && apt-get install -y postgresql-client curl

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# ✅ Set Poetry's PATH explicitly
ENV PATH="/root/.local/bin:$PATH"
ENV PYTHONPATH="/app"

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY pyproject.toml poetry.lock ./

# ✅ Verify that Poetry is installed before using it
RUN poetry --version

# ✅ Install dependencies globally
RUN poetry config virtualenvs.create false && poetry install --no-root --no-interaction

# Copy the rest of the application
COPY . .

# Expose FastAPI's port
EXPOSE 8000

# ✅ Run the application without worrying about virtual environments
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
