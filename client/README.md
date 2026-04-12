## Client (Frontend)

This document highlights the user-facing features and frontend architecture of StudySprint. For the overall project description, please see the [root README](../README.md).

### Frontend Highlights

- **Immersive Reading Experience**: Dynamically renders markdown and securely sanitized rich HTML posts.
- **Interactive UI**: Real-time commenting feedback and seamless toast notifications for interactive user engagement.
- **Integrated Admin Dashboard**: Client-side protected routes giving authors a dedicated interface to create, edit, and moderate posts using an integrated rich-text editor (Quill).
- **Global Ready**: Built-in internationalization (i18n) configured to efficiently serve localized UI content.
- **Responsive Design**: Fluid layouts ensuring seamless navigation across all mobile, tablet, and desktop viewports.

### Client-Side Technology showcase

Our client-side tech stack is chosen for maintainability, performance, and modern web standards:
- **Core UI**: **React 19**, **React Router**, and **Ant Design** for a professional, accessible, and consistent component library.
- **State Management**: React Context paired with a robust custom hooks architecture guarantees a clean separation of concerns between API communication and UI state.
- **Content Security & Processing**: **Quill** (rich text editing), **marked** (Markdown parsing), and **DOMPurify** (strict XSS protection and content safety).
- **Build & Tooling**: Built and bundled with **Vite** for an optimized production build and excellent rendering speed.

### Architectural Details

The frontend codebase is organized to scale, heavily utilizing specialized custom hooks to cleanly abstract network and business logic away from the UI components. 

> **For technical details and architectural guidelines on state and data fetching, please refer to the dedicated [Hooks Architecture README](./src/hooks/README.md).**
