# CineVault

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.101.1-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-9.0.3-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

CineVault is a solo, full-stack MERN movie-tracking project inspired by Letterboxd. It uses [TMDB](https://www.themoviedb.org/) data to help users discover films, track personal collections, and write reviews.

- Demo preview: [ADD DEMO GIF/SCREENSHOT]
- Live demo: [ADD DEPLOY URL]
- Screenshots: [ADD SCREENSHOTS]
- License: [ADD LICENSE]

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install dependencies](#install-dependencies)
  - [Configure environment variables](#configure-environment-variables)
  - [Run locally](#run-locally)
- [Available Commands](#available-commands)
- [Architecture](#architecture)

---

## Features

### Discovery and Search

- The home page shows TMDB's trending-weekly and top-rated movie feeds as separate sections.

- Search the TMDB catalogue by title. Results load as you scroll using TanStack Query's `useInfiniteQuery` and an `IntersectionObserver` sentinel. No pagination library is used.

### Movie Pages

- Each movie page shows its overview, TMDB rating data, runtime, genres, languages, cast, crew, release information, and community reviews. A trailer appears when one is available.
- Use dedicated tabs for details, cast, crew, releases, and reviews.

### Account Access

- Sign up with email verification through a JWT-based link that expires after one day.
- Once verified, sign in with a 30-day HTTP-only JWT cookie. Signing out clears it.

### Personal Collections

- Add movies to your Watch History, Watchlist, and Likes. Optimistic updates show changes immediately.

- Narrow each list by release-year range, up to three genres, sort field, and direction. Your Watch History also lets you filter by whether a movie is in your Likes.

- More results load automatically when you reach the bottom of a collection.

### Reviews and Profile

- Write, edit, or delete one review per movie. Filter your review history by date and sort order.

- Your own reviews load as you scroll. Community reviews use a "Load More" button.

- Your profile shows totals and recent activity across Likes, Watch History, Watchlist, and Reviews.

---

## Tech Stack

| Area              | Technologies                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Frontend          | React 19.2.5, Vite 8.0.10, React Router 7.11.0, TanStack Query 5.101.1, Tailwind CSS 4.2.4 |
| Frontend tooling  | ESLint 10.2.1, Vite SVGR 5.2.0                                                             |
| Backend           | Express 5.2.1, Mongoose 9.7.4, JSON Web Token 9.0.3, Nodemailer 9.0.3                      |
| Data and services | MongoDB, TMDB API, Gmail email transport                                                   |
| Root development  | concurrently 9.2.4                                                                         |

---

## Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/       # Layouts, route guards, navbar, and shared UI
│   │   ├── context/          # Authentication provider and context
│   │   ├── features/         # Auth, home, movie, search, collections, profile, reviews
│   │   ├── hooks/            # Shared hooks
│   │   ├── pages/            # Routed page components
│   │   ├── utils/            # Credentialed API request helper
│   │   └── main.jsx          # Router and provider setup
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/               # Database connection
│   ├── controllers/          # Auth, movie, and user handlers
│   ├── middlewares/          # Auth, validation, rate limiting, and errors
│   ├── models/               # User, user-movie, and review schemas
│   ├── routes/               # Auth, movie, and user endpoints
│   ├── utils/                # Email and request validators
│   ├── index.js              # Express entry point
│   └── package.json
└── package.json              # Concurrent development script
```

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- TMDB API access token
- Gmail credentials for verification emails

### Install dependencies

Install dependencies for the root runner and both applications:

```bash
npm install

cd frontend
npm install

cd ../backend
npm install
```

### Configure environment variables

Create `.env` files in `frontend/` and `backend/`. Keep all credentials out of source control.

#### `frontend/.env`

| Variable       | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `VITE_API_URL` | API base URL used by the frontend request helper. |

#### `backend/.env`

| Variable     | Purpose                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| `MONGO_URI`  | MongoDB connection string.                                                     |
| `JWT_SECRET` | Secret for signing and verifying authentication and email-verification tokens. |
| `TMDBtoken`  | TMDB API access token used by movie-data requests.                             |
| `CLIENT_URL` | Allowed credentialed-CORS origin and base URL for verification links.          |
| `EMAIL_USER` | Gmail account used to send verification messages.                              |
| `EMAIL_PASS` | Password or app password for the email account.                                |
| `PORT`       | Optional backend listening port; the server falls back to `3000`.              |
| `NODE_ENV`   | Optional runtime environment used by cookie and error handling.                |

### Run locally

From the repository root, start both applications:

```bash
npm run dev
```

The backend listens on `PORT` or falls back to `3000`. `vite.config.js` does not configure `server.port`; use the Vite development-server URL printed when the frontend starts, and align `VITE_API_URL` and `CLIENT_URL` with your local addresses.

---

## Available Commands

| Location    | Command           | Description                              |
| ----------- | ----------------- | ---------------------------------------- |
| Root        | `npm run dev`     | Start frontend and backend concurrently. |
| `frontend/` | `npm run dev`     | Start the Vite development server.       |
| `frontend/` | `npm run build`   | Build the frontend for production.       |
| `frontend/` | `npm run lint`    | Run frontend ESLint checks.              |
| `frontend/` | `npm run preview` | Preview the frontend production build.   |
| `backend/`  | `npm run dev`     | Start the Express API with Nodemon.      |

---

## Architecture

The frontend is a feature-organized React SPA with React Router separating public, authentication, and protected user routes. TanStack Query manages API state and infinite data flows; a shared request helper sends credentialed requests to the Express REST API. The backend proxies and caches TMDB responses, protects user endpoints with JWT cookies, and persists users, movie-status records, and review snapshots in MongoDB through Mongoose.
