import { SetOptions, createClient } from 'redis';
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

const set = async (key: string, value: string, options?: SetOptions) => {
  await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};
const del = async (key: string) => {
  await redisClient.del(key);
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;
  return await redisClient.get(key);
};

const deleteAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

export const RedisClient = {
  connect,
  get,
  set,
  del,
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
