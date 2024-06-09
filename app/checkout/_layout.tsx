import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          headerShown: false,
          // Set the presentation mode to modal for our modal route.
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
