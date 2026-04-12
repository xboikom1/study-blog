# StudySprint

StudySprint is a production-grade full-stack blog platform implemented as a monorepo. It is built with a modern, maintainable stack and follows common production conventions:

- **React 19** + **Vite** frontend (client)
- **Express 5** backend API (server)
- **MongoDB** (local or external). For local testing you can start MongoDB in **Docker** (recommended), or connect an existing MongoDB instance (for example using MongoDB Compass)
- Image uploads (local in development; **Cloudinary** supported for deployment)

This README gives a high-level overview, main features, and quick local setup. For detailed server and client docs see `server/README.md` and `client/README.md`.

---

## Main Features

- **Public Blog Platform**: Dynamic blog listing and post pages supporting immersive markdown and sanitized HTML rendering.
- **Integrated Admin Dashboard**: Dedicated secure panel for creating, updating, or deleting posts and orchestrating comment moderation.
- **Flexible File Management**: Robust image handling supporting swift local storage in development or scalable **Cloudinary** connections for production.
- **Secure Authentication**: **JWT-based** authentication to safeguard administrative routes and critical API access.
- **AI-Powered Workflows**: Intelligent text assistance and content generation capabilities integrated via **Google Gemini**.

## Architecture & Key Technologies

The repository follows a monorepo layout with two primary workspaces: `/client` (frontend) and `/server` (backend). Below is an explicit list of the technologies used across the project.

### Frontend (Client):

- **React 19** (component architecture)
- **Vite** (dev server / optimized build)
- **Ant Design** (professional UI library)
- **React Router** (client-side routing)
- **Quill** (integrated rich text editor)
- **marked** (markdown parsing)
- **DOMPurify** (strict HTML sanitization)
- **react-hot-toast** (toast notifications)
- **i18next** (internationalization strategy)
- **moment** (date formatting)
- **axios** (pre-configured HTTP client)

### Backend (Server):

- **Node.js** + **Express 5** (fast, modern async server framework)
- **Mongoose** (MongoDB ODM for flexible data modeling)
- **JSON Web Tokens** (JWT) for secure authentication
- **bcryptjs** (password hashing)
- **multer** (multipart file upload handling)
- **Cloudinary SDK** (for scalable cloud image uploads)
- **Google Gemini integration** (AI content generation logic)
- **cors**, **helmet** (security and header hardening)
- **express-rate-limit** (basic rate limiting for stability)
- **dotenv** (environment configuration decoupled from code)

### Dev / Infra / Tooling:

- **Docker** & **Docker Compose** (used to run MongoDB locally during development without cloud dependencies)
- **MongoDB** (local Docker or external cloud instance options)
- **Mongo Express** (optional web-based MongoDB admin interface)
- **Vercel** configuration for modern deployment pipelines

## Quick Local Setup

1. Server: install, configure env, setup (starts MongoDB and seeds data)

   ```cmd
   cd server
   copy .env.example .env
   npm install
   npm run setup
   npm run dev
   ```

   Notes:

   - `npm run setup` uses Docker Compose to start MongoDB and then runs the seeding script. Make sure Docker Desktop is running.
   - If you want Cloudinary uploads during development, ensure your Cloudinary credentials are set in `server/.env`.

2. Client: install and start Vite dev server

   ```cmd
   cd client
   copy .env.example .env
   npm install
   npm run dev
   ```

   - The frontend dev server runs by default on `http://localhost:5173` and talks to the server on `http://localhost:5001` (configured via `VITE_BASE_URL`).

## Where to get more details

- Client-specific docs: `client/README.md`
- Server-specific docs: `server/README.md`
- Agent/developer notes: `AGENTS.md`
