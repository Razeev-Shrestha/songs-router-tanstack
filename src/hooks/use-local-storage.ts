import { useSyncExternalStore } from "react";

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const subscribe = (callback: () => void): (() => void) => {
  const controller = new AbortController();
  window.addEventListener("storage", callback, { signal: controller.signal });

  return () => {
    controller.abort();
  };
};

export const useLocalStorage = <T>(
  key: string
): [T, (arg: T) => void, () => void] => {
  const store = useSyncExternalStore(subscribe, () => getFromLocalStorage(key));

  const setItem = (item: T) => {
    const stringifiedItem = JSON.stringify(item);
    localStorage.setItem(key, stringifiedItem);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
  };

  const item = JSON.parse(store as string);

  return [item, setItem, removeItem] as [T, (arg: T) => void, () => void];
};
