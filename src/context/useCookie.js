import { useState } from "react";
import Cookies from "js-cookie";

export const useCookie = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = Cookies.get(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      Cookies.set(keyName, JSON.stringify(newValue), { expires: 7 }); // Set cookie with a 7-day expiration
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  const removeValue = () => {
    try {
      Cookies.remove(keyName);
    } catch (err) {
      console.error(err);
    }
    setStoredValue(null);
  };

  return [storedValue, setValue, removeValue];
};
