## Server (Backend)

This document highlights the API features and backend architecture of StudySprint. For the overall project description, please see the [root README](../README.md).

### Backend Highlights

- **Robust REST API**: A structured and scalable Express API serving data securely to the client.
- **AI-Powered Content Generation**: Integrated with Google Gemini to provide optional AI assistance for text generation and blog creation.
- **Flexible File Management**: Secure and efficient handling of image uploads supporting both local file storage and cloud storage via Cloudinary.
- **Flexible Database Configuration**: Supports both a local Dockerized MongoDB instance for a seamless development experience and cloud-hosted MongoDB for production.
- **Global Error Handling**: Utilizes centralized error handlers to ensure high reliability and consistent, informative API responses.

### Server-Side Technology Showcase

Our backend tech stack is chosen for performance, scalability, and maintainability:
- **Core Framework**: **Node.js** and **Express 5** for a fast, unopinionated, and modern web server architecture.
- **Database & Modeling**: **MongoDB** paired with **Mongoose** ORM to flexibly manage blogs, comments, and user profiles, supporting local or cloud deployments.
- **Media Processing**: **Multer** for robust multipart/form-data parsing, integrated with **Cloudinary** for scalable cloud image storage in addition to local handling.
- **AI Integration**: Official **Google Gemini SDK** for intelligent content generation and automated workflow enhancements.

### Architectural Details

The backend codebase is organized to scale while maintaining a strict separation of concerns among controllers, models, and routes.
- **Modern Async Flow**: Controller logic is wrapped in a dedicated `asyncHandler`, eliminating repetitive `try-catch` blocks and keeping code focused on business rules.
- **Predictable API Contracts**: All endpoints strictly use standardized response helpers (`sendSuccess`, `sendError`) to guarantee consistent JSON structures across the entire application.
- **Centralized Configurations**: Environment variables, database connection logic, and system-wide messaging constants are decoupled into specific configuration files for optimal maintainability.



