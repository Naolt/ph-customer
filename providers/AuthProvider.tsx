import { router } from "expo-router";
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

  const loadUser = async () => {
    const accesstoken = await SecureStore.getItemAsync("accesstoken");
    const refreshtoken = await SecureStore.getItemAsync("refreshtoken");
    const user_id = await SecureStore.getItemAsync("user_id");
    setUser({ accesstoken, refreshtoken, user_id });
  };

  const saveUser = async (data) => {
    await SecureStore.setItemAsync("accesstoken", data.accesstoken);
    await SecureStore.setItemAsync("refreshtoken", data.refreshtoken);
    await SecureStore.setItemAsync("user_id", data.user_id.toString());
    setUser(data);
  };

  const removeUser = async () => {
    await SecureStore.deleteItemAsync("accesstoken");
    await SecureStore.deleteItemAsync("refreshtoken");
    await SecureStore.deleteItemAsync("user_id");
    setUser(null);
  };

  useEffect(() => {
    loadUser();

    // if the user is logged in, redirect to the home page
    if (user?.user_id) {
      router.replace("home");
    } else {
      router.replace("login");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
