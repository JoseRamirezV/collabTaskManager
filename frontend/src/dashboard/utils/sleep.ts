export const sleep = (seconds: number = 1) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
