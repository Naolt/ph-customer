import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="form1" options={{ headerShown: false }} />
        <Stack.Screen name="form2" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="white" style="light" />
    </>
  );
};

export default AuthLayout;
