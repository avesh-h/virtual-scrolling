let timeout;

export const debounce = (callback, delay) => {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
};
