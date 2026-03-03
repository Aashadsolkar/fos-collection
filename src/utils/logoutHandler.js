let logoutFunction = null;

export const setLogoutHandler = (fn) => {
  logoutFunction = fn;
};

export const triggerLogout = () => {
  if (logoutFunction) {
    logoutFunction();
  }
};