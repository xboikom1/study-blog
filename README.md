 # StudySprint

 StudySprint is a production-grade full-stack blog platform implemented as a monorepo. It is built with a modern, maintainable stack and follows common production conventions:

 - **React 19** + **Vite** frontend (client)
 - **Express 5** backend API (server)
 - **MongoDB** (local or external). For local testing you can start MongoDB in **Docker** (recommended), or connect an existing MongoDB instance (for example using MongoDB Compass)
 - Image uploads (local in development; **Cloudinary** supported for deployment)

 This README gives a high-level overview, main features, and quick local setup. For detailed server and client docs see `server/README.md` and `client/README.md`.

 ---

## Main features

- Public blog listing and post pages (markdown + sanitized HTML rendering)
- Admin panel for creating/updating/deleting posts and moderating comments
- File uploads for blog images (stored locally or connected to **Cloudinary**)
- **JWT-based** authentication
- AI content generation using **Google Gemini**

 ## Architecture & key technologies

 The repository follows a monorepo layout with two primary workspaces: `/client` (frontend) and `/server` (backend). Below is an explicit list of the technologies used across the project.

### Frontend (client):
   - **React 19**
   - **Vite** (dev server / build)
   - **Ant Design** (UI library)
   - **React Router** (routing)
   - **Quill** (rich text editor)
   - **marked** (markdown parsing)
   - **DOMPurify** (HTML sanitization)
   - **react-hot-toast** (toasts/notifications)
   - **i18next** (internationalization)
   - **moment** (date formatting)
   - **axios** (HTTP client)
   - **ESLint**

### Backend (server):
   - **Node.js** + **Express 5**
   - **Mongoose** (MongoDB ODM)
   - **JSON Web Tokens** (JWT) for authentication
   - **bcryptjs** (password hashing)
   - **multer** (file upload handling)
   - **cloudinary SDK** (for image uploads)
   - **Google Gemini integration** (AI content generation)
   - **cors**, **helmet** (security hardening)
   - **express-rate-limit** (basic rate limiting)
   - **dotenv** (environment configuration)

### Dev / infra / tooling:
   - **Docker** & **Docker Compose** (used to run MongoDB locally during development)
   - **MongoDB** (local Docker or external instance; compatible with MongoDB Compass)
   - **Mongo Express** (optional web-based MongoDB admin interface)
   - **Vercel** configuration for deployment

 ## Quick local setup

 1) Server: install, configure env, setup (starts MongoDB and seeds data)

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

 2) Client: install and start Vite dev server

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
