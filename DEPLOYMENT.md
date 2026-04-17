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

## Deploy on Render (Free)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize the connection

### Step 2: Deploy Backend
1. From Render Dashboard, click **New +** → **Web Service**
2. Select **PayGaurd-GigShield-Devtrails** repo from GitHub
3. Set these values:
   - **Name**: `payguard-backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./gigshield-backend/Dockerfile`
   - **Port**: `3000`

4. Click **Advanced** and add environment variables:
   - `NODE_ENV`: `production`
   - `RAZORPAY_KEY_ID`: Your Razorpay key
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase key

5. Click **Create Web Service**

### Step 3: Get Your Public URL
After deployment, Render will give you a URL like:
```
https://payguard-backend.onrender.com
```

This is your **deployed link** for the hackathon!

## GitHub Actions Auto-Deployment

On every push to `main`:
1. GitHub Actions builds Docker images
2. Images are pushed to Docker Hub

## Tech Stack

- **Frontend**: React + Expo + Nginx
- **Backend**: Node.js + Express
- **ML**: Python + FastAPI
- **Database**: Redis
- **Container**: Docker + Docker Compose
