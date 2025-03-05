export const fetcher = (params) => {
  const [url, ...args] = params;
  console.log(...args)
  fetch(url, ...args);
};
