# GigShield Docker Deployment

## Quick Start

```bash
docker-compose up -d
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| backend | 3000 | Node.js/Express API |
| ml-service | 8000 | Python/FastAPI ML model |
| redis | 6379 | Redis cache & queue |
| mobile-web | 4000 | React Native web build |

## Environment Variables

Create a `.env` file in the project root:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## ML Model

Before building, ensure `model/premium_model.pkl` exists. To train:

```bash
cd model && pip install -r requirements.txt && python train_premium.py
```

## API Documentation

- Backend: `http://localhost:3000`
- ML Service: `http://localhost:8000/docs`
- Mobile Web: `http://localhost:4000`