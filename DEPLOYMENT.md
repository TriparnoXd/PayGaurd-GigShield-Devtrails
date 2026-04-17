# PayGaurd GigShield DevTrails - Deployment Guide

## Local Development

```bash
docker compose up -d
```

Access:
- Frontend: http://localhost:4000
- Backend API: http://localhost:3000
- ML Service: http://localhost:8000
- Redis: localhost:6379

## Deploy on Render (One-Click)

This repository includes a `render.yaml` Blueprint which allows you to deploy the entire stack with a few clicks.

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize the connection

### Step 2: Deploy using Blueprint
1. From Render Dashboard, click **New +** → **Blueprint**
2. Select your repository.
3. Render will detect the `render.yaml` file.
4. It will prompt you for the following environment variables:
   - `RAZORPAY_KEY_ID`: Your Razorpay key
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase key
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
5. Click **Apply**.

Render will automatically create three services:
- `backend`: The Node.js Express API.
- `ml-service`: The Python FastAPI service.
- `mobile-web`: The React Native/Expo web frontend (served via Nginx).

### Step 3: Get Your Public URL
After deployment, the `mobile-web` service will have a public URL like:
```
https://mobile-web.onrender.com
```

This is your **deployed link**!

## GitHub Actions Auto-Deployment

On every push to `main`:
1. GitHub Actions builds Docker images.
2. Images are pushed to GitHub Container Registry (GHCR).

## Tech Stack

- **Frontend**: React + Expo + Nginx
- **Backend**: Node.js + Express
- **ML**: Python + FastAPI
- **Database**: Redis (Mocked by default on Render)
- **Container**: Docker + Docker Compose
