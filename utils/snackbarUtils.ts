// utils/snackbarUtil.js
let showSnackbar;

export const setShowSnackbar = (fn) => {
  showSnackbar = fn;
};

export const getShowSnackbar = () => showSnackbar;
