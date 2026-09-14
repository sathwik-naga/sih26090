# Smart Artisan — Backend API Foundation

Lightweight Node.js + Express backend foundation for the Smart Artisan handicraft marketplace.

---

## Getting Started Locally

### 1. Installation
Navigate to the `backend/` directory:
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```
Default `.env` values:
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Running the Server
For development with automatic reloading:
```bash
npm run dev
```

For production start:
```bash
npm start
```

### 4. Health Check
Open in your browser or run:
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{
  "success": true,
  "message": "Smart Artisan backend is operational.",
  "data": {
    "status": "healthy",
    "uptimeSeconds": 12,
    "timestamp": "2026-09-14T10:35:00.000Z",
    "service": "smart-artisan-backend",
    "version": "1.0.0",
    "environment": "development"
  }
}
```

---

## API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Server welcome and root status |
| `GET` | `/api/health` | Service health, uptime, and status |
| `GET` | `/api/products` | Retrieve craft listings (Future-ready) |
| `POST` | `/api/products` | Publish new craft listing (Future-ready) |
| `GET` | `/api/artisans` | Retrieve artisan profiles (Future-ready) |
| `POST` | `/api/enquiries` | Submit buyer wholesale inquiry (Future-ready) |
| `POST` | `/api/ai/analyze-product` | Image-based craft cataloging (Future-ready) |

---

## Deployment Instructions

### Deploy to Render
1. In Render Dashboard, click **New** > **Web Service**.
2. Connect your Git repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `PORT`: `5000` (or leave default assigned by Render)
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
   - `NODE_ENV`: `production`
5. Click **Create Web Service**.

### Deploy to Railway
1. In Railway, click **New Project** > **Deploy from GitHub repo**.
2. Set the **Root Directory** to `/backend`.
3. Railway will automatically detect `package.json` and start via `npm start`.
4. Add Environment Variables:
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
5. Copy the generated Railway domain and update `VITE_API_URL` on your frontend deployment.
