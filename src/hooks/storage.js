import { useState, useEffect } from "react";

function getLocalItem(key, initialValue = "") {
  console.log(localStorage.getItem(key), key);
  const jsonValue = JSON.parse(localStorage.getItem(key));
  console.log(jsonValue);
  if (!!jsonValue) return jsonValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getLocalItem(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
