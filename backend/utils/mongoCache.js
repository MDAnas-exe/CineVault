import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

const getCached = (key) => cache.get(key);

const setCached = (key, value) => cache.set(key, value);

const invalidateUserCache = (userId) => {
  const prefix = `user:${userId}:`;
  const userKeys = cache.keys().filter((k) => k.startsWith(prefix));
  if (userKeys.length) cache.del(userKeys);
};

export { getCached, setCached, invalidateUserCache };
