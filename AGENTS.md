# AI Agent Instructions for StudySprint

## Architecture & Big Picture
- **Monorepo Structure**: React 19 + Vite frontend (`/client`) and Express 5 + MongoDB backend (`/server`).
- **Database via Docker**: No cloud DB is needed. MongoDB runs locally in Docker and is managed via `npm run setup` in the server folder, which also seeds data.
- **Local File Storage**: Image uploads are stored locally using `multer`. The project uses Google Gemini for optional AI text generation.

## Developer Workflows
- **Running the Server**: 
  1. `cd server`
  2. `npm run setup` (starts MongoDB via Docker and seeds the database)
  3. `npm run server` (starts the Express API on port 5001)
- **Running the Client**:
  1. `cd client`
  2. `npm run dev` (starts the Vite dev server on port 5173)
- **Database Inspection**: Access Mongo Express locally at `http://localhost:8081` (credentials in `server/.env`).

## Server-Specific Conventions
- **Async Handlers**: Do not use `try-catch` blocks in controllers. Instead, wrap route logic in `asyncHandler` imported from `server/src/helpers/asyncHandler.js`.
- **Standardized Responses**: Responses must strictly use `sendSuccess` or `sendError` helpers from `server/src/helpers/response.js`.
  - Example: `return sendSuccess(res, { blog }, 'Blog fetched safely', 200)`
- **Configuration**: Use `server/src/configs/db.js` for data access details; rely on `server/src/constants/messages.js` for standardized error/success messages.

## Client-Specific Conventions
- **API Communication**: Always use the pre-configured Axios instance from `client/src/api/axiosConfig.js`. It automatically handles Auth Bearer tokens (from `localStorage`) and switches `Content-Type` for `FormData`.
- **State Management**: Use React Context (`client/src/context/AppContext.jsx`) instead of global stores like Redux.
- **Hooks**: Use custom hooks located in `client/src/hooks/` to abstract complex logic (e.g., separating core vs api requests).
- **Styling & UI**: Ant Design combined with custom CSS (`client/src/index.css`). Do not use Tailwind, as it is not installed. Blog posts display markdown parsed through `marked` and sanitized with `DOMPurify`.
- **Imports**: Use the `@` alias for absolutely resolving paths to `client/src/` (e.g. `import { Something } from '@/components'`).
- **Additional Libs**: Toast notifications use `react-hot-toast`. Date formatting uses `moment`. Rich text editing is handled by `quill`. Animations use `motion`. Translations are handled via `i18next` (`client/src/i18n/`).
