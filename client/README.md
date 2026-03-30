## Client — StudySprint Web App

React + Vite single‑page app for browsing blogs, reading posts, commenting, and administering content.

### Tech Stack
- **Core:** React 19, React Router, Axios
- **UI:** Ant Design, @ant-design/icons
- **Content:** Quill editor, Marked, DOMPurify
- **Utils:** React Hot Toast, i18next/react-i18next, Moment.js

### Quick Start
```bash
# 1. Copy environment file (already configured for local development)
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Start development server (port 5173)
npm run dev
```

### Environment
The `.env` file should contain:
```
VITE_BASE_URL=http://localhost:5001
```

This is already configured in `.env.example` for local development.

For the full feature list and endpoints, see `../server/README.md`.

### Notes
- Axios `baseURL` is `import.meta.env.VITE_BASE_URL`
- On login, JWT is stored and attached to `Authorization` header
- Rich text HTML is stored in the database; Quill renders/edits content
- i18next handles internationalization (currently English)
- DOMPurify sanitizes HTML content for safe rendering
- Moment.js formats dates throughout the application