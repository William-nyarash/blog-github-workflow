# Blog Frontend (React + Vite)

This is the client application for the Blog CI/CD project. It provides a user interface for authentication and blog management while communicating with the backend API.

## What This App Does

- Authenticates users with username and password
- Persists logged-in session using browser local storage
- Fetches and displays blogs from the backend
- Creates new blog posts
- Likes and deletes existing blog posts
- Shows success and error notifications for user actions

## Tech Stack

- React 18
- Vite
- Axios
- Vitest + Testing Library
- ESLint

## Prerequisites

- Node.js 18+ recommended
- npm
- Backend API available at `http://localhost:5001` (required for login/blog API requests)
> [!NOTICE]
> Incase you defined a port in the environmental variables change the port above to match that of you env 
## Getting Started

### 1. Install dependencies

```bash
cd client
npm install
```

### 2. Start the app

From the `client` folder:

```bash
npm run dev
```

The client runs on Vite's dev server (usually `http://localhost:5173`).

## API Proxy in Development

Vite is configured to proxy all `/api` requests to:

`http://localhost:3001`

This allows the frontend to call:

- `/api/login`
- `/api/blogs`

without CORS issues in local development.

## Available Client Scripts

Run these inside `client`:

- `npm run dev` - start Vite dev server
- `npm run build` - build production assets
- `npm run preview` - preview production build locally
- `npm run test` - run tests once with Vitest
- `npm run lint` - run ESLint

## Testing

This project uses Vitest with a JSDOM environment and Testing Library.

Run tests:

```bash
cd client
npm run test
```

## Project Structure (Client)

```text
client/
   src/
      App.jsx
      main.jsx
      components/
         Blog.jsx
         CreateBlog.jsx
         Login.jsx
         Togglable.jsx
      services/
         blogs.js
         login.js
   public/
   testSetup.js
   vite.config.js
```

## Common Troubleshooting

- If login fails for valid credentials, verify backend is running and reachable on port `3001`.
- If blog actions fail, confirm token is present in local storage as `loggedInUser`.
- If `/api` calls fail in development, confirm Vite proxy settings in `vite.config.js` and backend URL.
