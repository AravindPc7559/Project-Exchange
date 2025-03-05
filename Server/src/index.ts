import express, { Express } from 'express';
import { config } from './config/config';
import routes from './routes';
import mongoConnection from './config/mongoConnection';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import redisClient from './utils/redisClient';
import initializeSeedData from './Seed/initializeSeedData';

const app: Express = express();

// Connect to Redis
(async () => {
  await redisClient.connect();
})();

// DB Connection.
mongoConnection()

// Middleware
app.use(cors({
  origin: config.nodeEnv === 'development' ? 'http://localhost:3005' : 'https://your-production-domain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adding Seed Data
initializeSeedData()

// Logger Middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "view", "running.html"));
});

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on port ${config.port}`);
});
