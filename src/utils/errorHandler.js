let errorFunction = null;

export const setErrorHandler = (fn) => {
  errorFunction = fn;
};

export const triggerError = (message) => {
  if (errorFunction) {
    errorFunction(message);
  }
};