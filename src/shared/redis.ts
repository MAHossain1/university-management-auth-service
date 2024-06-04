import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});

const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('Redis error', error));
// eslint-disable-next-line no-unused-vars
redisClient.on('connect', error => console.log('Redis connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

export const RedisClient = {
  connect,
  redisPubClient,
  redisSubClient,
};
