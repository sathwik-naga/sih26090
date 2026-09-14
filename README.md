# Smart Artisan — Production-Ready Full-Stack Architecture

> **Digital Storefronts for India's Traditional Craftspeople**  
> A digital bridge connecting traditional Indian master artisans directly with domestic boutique owners and export buyers with zero commission.

---

## Folder Structure

```
smart-artisan/
│
├── frontend/                     # React 19 + Vite Frontend Application
│   ├── public/                   # Authentic craft photography & icons
│   │   └── crafts/
│   ├── src/
│   │   ├── components/           # Reusable UI components (Navbar, Footer, Badges, etc.)
│   │   ├── pages/                # Landing, Marketplace, Detail, Dashboard, AddProduct, MyProducts, Enquiry
│   │   ├── layouts/              # MainLayout and page wrappers
│   │   ├── context/              # AppContext (localStorage persistence & role management)
│   │   ├── hooks/                # Custom application hooks (useApp, useLanguage)
│   │   ├── services/             # API client with graceful offline fallback
│   │   ├── utils/                # Currency formatters & text utilities
│   │   ├── data/                 # Curated craft datasets & offline AI catalog knowledge base
│   │   ├── i18n/                 # 23-language Indian multilingual translation dictionary
│   │   ├── assets/               # Brand styles & assets
│   │   ├── App.jsx               # Main application component & routing
│   │   ├── App.css
│   │   ├── index.css             # Tailwind design tokens & typography
│   │   └── main.jsx              # React DOM entrypoint
│   ├── index.html
│   ├── package.json              # Frontend dependencies (React, Lucide, Tailwind, Vite)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example              # VITE_API_URL=http://localhost:5000
│   └── README.md                 # Frontend documentation & deployment guide
│
├── backend/                      # Node.js + Express API Server Foundation
│   ├── src/
│   │   ├── controllers/          # healthController, productController, artisanController, etc.
│   │   ├── routes/               # Modular Express routers (/health, /products, /artisans, /enquiries, /ai)
│   │   ├── services/             # Craft business logic
│   │   ├── models/               # Data schemas & blueprints
│   │   ├── middleware/           # errorHandler, notFoundHandler, CORS
│   │   ├── config/               # Environment variable configuration
│   │   ├── utils/                # Standardized JSON response helpers
│   │   └── server.js             # Express application entrypoint
│   ├── package.json              # Backend dependencies (express, cors, dotenv)
│   ├── .env.example              # PORT=5000, FRONTEND_URL=http://localhost:5173
│   └── README.md                 # Backend documentation & deployment guide
│
├── _backup_prototype/            # Safe backup checkpoint of initial prototype
├── package.json                  # Root monorepo orchestration scripts
├── README.md                     # Root architecture & deployment guide
└── .gitignore                    # Comprehensive ignore rules
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. One-Time Setup
Install dependencies for both frontend and backend from the root directory:
```bash
npm run install:all
```
*(Or install individually inside `frontend/` and `backend/`)*.

---

### 2. Running Locally

You can run the frontend and backend using root commands or directly within each directory:

#### Run Frontend (Port 5173)
```bash
# From root:
npm run dev

# Or directly:
cd frontend
npm run dev
```
Open **http://localhost:5173/** in your browser.

#### Run Backend (Port 5000)
```bash
# From root:
npm run dev:backend

# Or directly:
cd backend
npm run dev
```
Health Check: **http://localhost:5000/api/health**

---

### 3. Building for Production

#### Build Frontend
```bash
# From root:
npm run build:frontend

# Or directly:
cd frontend
npm run build
```

---

## Offline-First Architecture

The frontend is completely decoupled from the backend:
- **Zero Backend Dependency**: The current prototype continues to store products, active user roles, language preferences, and inquiries directly in `localStorage`.
- **Offline AI Cataloging**: The AI image-based catalog generator runs in-browser using the local craft knowledge base in `frontend/src/data/craftAiCatalog.js`.
- **Graceful Fallback**: If the backend is offline, the API client (`frontend/src/services/api.js`) gracefully falls back to local data without throwing errors or breaking UI state.

---

## Deployment Guide

### A. Deploy Frontend (Vercel)
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Set the **Root Directory** to `frontend`.
5. Configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com` (your deployed backend URL)
7. Click **Deploy**.

---

### B. Deploy Frontend (Netlify)
1. Log in to [Netlify](https://netlify.com) and click **Import an existing project**.
2. Set **Base directory** to: `frontend`
3. Set **Build command** to: `npm run build`
4. Set **Publish directory** to: `frontend/dist`
5. Under **Environment variables**, set:
   - `VITE_API_URL`: Your backend URL
6. Click **Deploy site**.

---

### C. Deploy Backend (Render)
1. Log in to [Render](https://render.com) and click **New** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `smart-artisan-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `PORT`: `5000` (Render will bind automatically)
   - `FRONTEND_URL`: `https://your-smart-artisan.vercel.app`
   - `NODE_ENV`: `production`
5. Click **Create Web Service**.

---

### D. Deploy Backend (Railway)
1. Log in to [Railway](https://railway.app) and click **New Project** > **Deploy from GitHub repo**.
2. In Settings, set **Root Directory** to `/backend`.
3. Railway automatically detects `npm start` from `backend/package.json`.
4. Under Variables, add:
   - `FRONTEND_URL`: `https://your-smart-artisan.vercel.app`
5. Copy the generated Railway public URL and paste it into the `VITE_API_URL` environment variable on your frontend deployment.
