# Smart Artisan — Frontend Application

Modern React 19 + Vite digital storefront and craft marketplace for India's traditional artisans.

---

## Getting Started Locally

### 1. Installation
Navigate to the `frontend/` directory and install dependencies:
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_API_URL=http://localhost:5000
```
*(Note: The frontend operates offline-first using localStorage and mock data. It continues functioning seamlessly even if the backend is offline).*

### 3. Running Development Server
```bash
npm run dev
```
The application will launch on **http://localhost:5173/**.

### 4. Building for Production
```bash
npm run build
```
Generates production bundle in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## Deployment Instructions

### Deploy to Vercel
1. In the Vercel Dashboard, click **Add New Project** and select your repository.
2. Under **Root Directory**, set:
   ```
   frontend
   ```
3. Build & Development Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com` (your deployed backend URL)
5. Click **Deploy**.

### Deploy to Netlify
1. Click **Add new site** > **Import an existing project**.
2. Set **Base directory** to: `frontend`
3. Set **Build command** to: `npm run build`
4. Set **Publish directory** to: `frontend/dist`
5. Under Environment variables, add:
   - `VITE_API_URL`: Your backend URL
6. Click **Deploy site**.
