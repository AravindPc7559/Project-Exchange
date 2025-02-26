import { createClient } from 'redis';
import { config } from '../config/config';

const redisClient = createClient({
    username: 'default',
    password: config.redisPassword,
    socket: {
        host: 'redis-15563.c251.east-us-mz.azure.redns.redis-cloud.com',
        port: 15563
    },
  });
  
  redisClient.on('error', (err) => console.error('Redis Client Error:', err));
  redisClient.on('connect', () => console.log('Redis Client Connected'));
  
export default redisClient;
