import { router } from "expo-router"; // Ensure router is correctly imported and initialized
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: {
    accesstoken: null,
    refreshtoken: null,
    user_id: null,
  },
  saveUser: (val) => {},
  removeUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    accesstoken: null,
    refreshtoken: null,
    user_id: null,
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accesstoken = await SecureStore.getItemAsync("accesstoken");
        const refreshtoken = await SecureStore.getItemAsync("refreshtoken");
        const user_id = await SecureStore.getItemAsync("user_id");

        if (accesstoken && refreshtoken && user_id) {
          setUser({ accesstoken, refreshtoken, user_id });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (user?.user_id) {
      router.replace("home");
    } else {
      router.replace("login");
    }
  }, [user]); // Depend on user state to handle navigation based on login status

  const saveUser = async (data) => {
    try {
      await SecureStore.setItemAsync("accesstoken", data.accesstoken);
      await SecureStore.setItemAsync("refreshtoken", data.refreshtoken);
      await SecureStore.setItemAsync("user_id", data.user_id.toString());
      setUser(data);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const removeUser = async () => {
    try {
      await SecureStore.deleteItemAsync("accesstoken");
      await SecureStore.deleteItemAsync("refreshtoken");
      await SecureStore.deleteItemAsync("user_id");
      setUser(null);
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
