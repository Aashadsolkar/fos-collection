let loaderFunctions = null;

export const setLoaderHandler = (functions) => {
  loaderFunctions = functions;
};

export const triggerLoaderStart = () => {
  loaderFunctions?.showLoader();
};

export const triggerLoaderStop = () => {
  loaderFunctions?.hideLoader();
};