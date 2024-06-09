import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{ headerShown: true, title: "Login" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: true, title: "Register" }}
        />
        <Stack.Screen
          name="forgot_password"
          options={{ headerShown: true, title: "Forgot password" }}
        />
        <Stack.Screen
          name="reset_password"
          options={{ headerShown: true, title: "Reset password" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default AuthLayout;
