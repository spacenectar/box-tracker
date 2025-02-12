# Box Tracker 📦

Welcome to Box Tracker, the ultimate solution for organizing and tracking all your stuff in boxes, across multiple locations, and even with multiple users! This repo is structured as a monorepo managed by `Nx`, with separate folders for the backend (`FastAPI`) and the frontend (`Next.js`).

Disclaimer: These docs are a work in progress and will evolve as the project develops. They are mostly just here for my reference at the moment.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [How to Navigate](#how-to-navigate)
5. [Contributing](#contributing)

---

## Tech Stack

- Frontend: `Next.js` (React)
- Backend: `FastAPI` (Python) with `PostgreSQL`
- Monorepo Management: `Nx`
- Infrastructure:
  - `Docker` for containerization
  - `Docker Compose` for service orchestration
- Documentation: Markdown files in `/docs`

---

## Project Structure

```plaintext
repo/
├─ projects/
│  ├─ backend/       # FastAPI backend service
│  └─ webapp/        # Next.js frontend service
├─ docs/              # Project documentation, design notes, etc.
├─ .env.example       # Environment variables (example)
├─ docker-compose.yml # Docker setup for backend and database
├─ nx.json            # Nx workspace configuration
└─ package.json       # Shared scripts for Nx tasks
```

### /docs

All the project documentation, including architectural diagrams, technical decisions, and implementation notes.

### /projects/webapp

The `Next.js` front-end. You can install dependencies with `yarn install` and start the development server using `nx run webapp:serve`.

### /projects/backend

The `FastAPI` backend that handles authentication, API endpoints, and database interactions.

**Note:** The backend is designed to run inside Docker, and you should not run it manually outside of the containerized environment.

---

## Getting Started

### Before you begin

1. Clone the Repo

   ```bash
   git clone https://github.com/spacenectar/box-tracker.git
   cd box-tracker
   ```

2. Ensure you have Docker installed and running.
3. Copy `.env.example` to `.env` and update the values as needed.

---

### Running the Project

#### Backend (Runs in Docker)

To start the backend (including `PostgreSQL`):

```bash
docker-compose up backend
```

This will:

- Start the `FastAPI` backend inside a container.
- Connect it to a `PostgreSQL` database inside Docker.

#### Frontend

To start the `Next.js` frontend:

```bash
nx run webapp:serve
```

This will start the development server, and the app should be available at `http://localhost:3000`.

#### Running Everything

You can start both the frontend and backend in one step:

```bash
docker-compose up
```

---

## Using Nx Commands

This project is managed using `Nx`, which allows for efficient task execution.
Here are some useful commands:

### Install dependencies

```bash
yarn install
```

### Run the backend inside Docker

```bash
docker-compose up backend
```

### Run the frontend

```bash
nx run webapp:serve
```

### Run database migrations

```bash
nx run backend:migrate
```

### Seed the database

```bash
nx run backend:seed
```

### Lint the code

```bash
nx format
```

---

## How to Navigate

- `docs/`: Project documentation, technical decisions, and notes.
- `projects/webapp/`: Frontend (`Next.js`).
- `projects/backend/`: Backend (`FastAPI`).
- `docker-compose.yml`: Defines how services (backend, database) are containerized.

---

## Contributing

If you want to help out, feel free to:

1. Fork or clone this repo.
2. Make your changes.
3. Submit a pull request with a clear description of what you did.

We'll review and merge it if it looks good.

---

Thanks for checking out Box Tracker! If you have questions, feature requests, or just want to rant about how unorganized your boxes are, open an issue or reach out. Let's build something awesome!
