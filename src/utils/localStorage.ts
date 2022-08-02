export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);    
  }
  return undefined;
};

export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};
