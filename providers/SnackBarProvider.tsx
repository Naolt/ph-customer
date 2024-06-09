// context/SnackbarContext.js
import Snackbar from "@/components/SnackBar";
import { setShowSnackbar } from "@/utils/snackbarUtils";
import React, { createContext, useState, useContext, useEffect } from "react";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ message, type });
  };

  useEffect(() => {
    setShowSnackbar(showSnackbar);
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar message={snackbar.message} type={snackbar.type} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
