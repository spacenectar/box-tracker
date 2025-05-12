![Box Tracker Logo](/libs/assets/branding/box-tracker-logo-square.png)

# Box Tracker

Welcome to Box Tracker, the ultimate solution for organizing and tracking all your stuff in boxes, across multiple locations, and even with multiple users! This repo is structured as a monorepo managed by `Nx`, with separate folders for the backend (`NestJS`) and the frontend (`NextJS`).


---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [How to Navigate](#how-to-navigate)
5. [Contributing](#contributing)

---

## Tech Stack

- Frontend: `Next.js` (React) with TypeScript
- Backend: `NestJS` (Node.js) with TypeScript
- Database: `PostgreSQL` with Prisma ORM
- Monorepo Management: `Nx`
- Infrastructure:
  - `Docker` for database containerization
  - `tmux` for development environment management
- Documentation: Markdown files in `/docs` and Storybook

---

## Project Structure

```plaintext
repo/
├─ projects/
│  ├─ backend/        # NestJS backend service
│  ├─ webapp/         # Next.js frontend service
│  └─ storybook/      # Storybook documentation
├─ libs/
│  ├─ assets/         # Shared assets
│  ├─ components/     # Shared UI components
│  ├─ helpers/        # Shared helper functions
│  ├─ mocks/          # Shared mock data
│  ├─ theme/          # SCSS design system
│  ├─ types/          # Shared TypeScript types
│  └─ scripts/        # Build scripts and generators
├─ docs/              # Project documentation
├─ .env.example       # Environment variables (example)
├─ docker-compose.yml # Docker setup for the database
├─ devkit.sh          # Development environment script
├─ nx.json            # Nx workspace configuration
└─ package.json       # Shared scripts for Nx tasks
```

### /docs

Complete project documentation, including architectural diagrams, technical decisions, and development setup guides.

### /projects/webapp

The `Next.js` frontend application with TypeScript. Contains the user interface for the Box Tracker application.

### /projects/backend

The `NestJS` backend that handles authentication, API endpoints, and database interactions using Prisma ORM.

### /libs

Shared libraries and components that are used across projects, including UI components, design systems, and TypeScript types.

---

## Getting Started

### Before you begin

1. Clone the Repo

   ```bash
   git clone https://github.com/spacenectar/box-tracker.git
   cd box-tracker
   ```

2. Ensure you have the following installed:
   - Node.js (v22+) and Yarn
   - Docker (for database only)
   - tmux (optional, for DevKit)

3. Copy `.env.example` to `.env` and update the values as needed.

---

### Running the Project

Box Tracker provides several ways to run the development environment:

1. **Standard Development**

   ```bash
   # Start both frontend and backend
   yarn dev
   ```

   Note: This will start both the frontend and backend services, as well as the storybook instance and Prisma Studio, however it will not start the database.

   ```bash
   # Start the database
   docker-compose up postgres
   ```

2. **DevKit Environment** (recommended)

   ```bash
   # Start the tmux-based development environment
   yarn devkit
   ```

3. **Individual Services**

   ```bash
   # Start just the database
   docker-compose up postgres

   # In another terminal, start the backend
   yarn backend

   # In another terminal, start the frontend
   yarn frontend
   ```

For more detailed information about running the project, see the documentation:

- [NX Monorepo Guide](./docs/development-setup/nx.md)
- [Docker Setup](./docs/development-setup/docker.md)
- [DevKit Environment](./docs/development-setup/devkit.md)

---

### Database Setup

If you need to initialize or reset your database schema and seed it with initial data, you can use the following command:

```bash
# Generate Prisma client, apply migrations, and seed the database
yarn db-setup
```

---

## How to Navigate

You can find more detailed information about various parts of the project in our documentation:

- [Development Setup Documentation](./docs/development-setup): Guides for working with the monorepo, Docker, and DevKit
- `docs/architectural-decisions/`: Technical decisions and implementation notes
- `docs/coding-guidelines/`: Standards and best practices for code
- `docs/design-guidelines/`: UI/UX standards and design system documentation
- `projects/webapp/`: Next.js frontend application
- `projects/backend/`: NestJS backend service
- `libs/`: Shared libraries and components

---

## Contributing

If you want to help out, feel free to:

1. Fork or clone this repo.
2. Make your changes.
3. Submit a pull request with a clear description of what you did.

We'll review and merge it if it looks good.

---

Thanks for checking out Box Tracker! If you have questions, feature requests, or just want to rant about how unorganized your boxes are, open an issue or reach out. Let's build something awesome!
