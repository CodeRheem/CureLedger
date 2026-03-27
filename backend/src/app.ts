import express, { Express, Request, Response, NextFunction } from 'express';
import routes from './routes';
import cors from 'cors';
import helmet from 'helmet';
import { ApiError } from '@core/ApiError';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://cureledger.campuscart.com.ng/api/v1'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route

// Mount API routes
app.use('/api/v1', routes);
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.getHttpStatus()).json(err.toResponse());
    return;
  }

  res.status(500).json({
    statusCode: '50000',
    message: err.message || 'Internal Server Error',
    data: null
  });
});

export default app;
