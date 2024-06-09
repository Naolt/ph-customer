import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import CartProvider from "@/providers/CartProvider";
import { FilterProvider } from "@/providers/FilterProvider";
import UserProvider from "@/providers/AuthProvider";
import { LocationProvider } from "@/providers/LocationProvider";
import { PaperProvider } from "react-native-paper";
import * as Linking from "expo-linking";
import { SnackbarProvider } from "@/providers/SnackBarProvider";

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix, "myapp://"],
  config: {
    screens: {
      PaymentSuccess: "payment/success",
      // other screens
    },
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <PaperProvider>
      <SnackbarProvider>
        <UserProvider>
          <LocationProvider>
            <CartProvider>
              <FilterProvider>
                <Stack>
                  {}
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="orderDetail"
                    options={{ headerShown: true, headerTitle: "Order Detail" }}
                  />
                </Stack>
              </FilterProvider>
            </CartProvider>
          </LocationProvider>
        </UserProvider>
      </SnackbarProvider>
    </PaperProvider>
  );
};

export default RootLayout;
