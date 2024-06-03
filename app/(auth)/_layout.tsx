import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: true }} />
        <Stack.Screen name="register" options={{ headerShown: true }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: true }} />
        <Stack.Screen
          name="email_verification"
          options={{ headerShown: true }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default AuthLayout;
