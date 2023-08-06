export const getCache = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value) as T;
};

export const setCache = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
