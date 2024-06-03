import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toggle from "@/components/Toggle";
import { router } from "expo-router";
import { UserContext } from "@/providers/AuthProvider";
import axios from "axios";

const Profile = () => {
  const { user, removeUser } = React.useContext(UserContext);
  const [active, setActive] = React.useState(false);

  const logout = () => {
    // hit the logout endpoint

    axios
      .post("https://back-end-pharma-hub.onrender.com/auth/logout", {})
      .then((response) => {
        console.log("Logged Out:", response.data);
        removeUser();
        router.push("login");
      })
      .catch((error) => {
        console.log("Log out Error:", error?.response?.data);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView className="px-8 py-4 space-y-4">
        <Text className="text-lg text-gray-900 font-psemibold text-center mb-4">
          Profile
        </Text>
        <TouchableOpacity onPress={() => router.push("editProfile")}>
          <View className="flex flex-row items-center space-x-2">
            <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
              <Image
                source={require("../../assets/icons/profile.png")}
                className="w-6 h-6"
              />
            </View>
            <View className="flex flex-col gap-0">
              <Text className="text-gray-700 font-psemibold">
                User information
              </Text>
              <Text className="text-gray-400">Change full name</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("changePassword")}>
          <View className="flex flex-row items-center space-x-2">
            <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
              <Image
                source={require("../../assets/icons/cart.png")}
                className="w-6 h-6"
              />
            </View>
            <View className="flex flex-col gap-0">
              <Text className="text-gray-700 font-psemibold">Security</Text>
              <Text className="text-gray-400">Change Password</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View className="flex flex-row items-center space-x-2">
          <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
            <Image
              source={require("../../assets/icons/cart.png")}
              className="w-6 h-6"
            />
          </View>
          <View className="flex flex-col gap- flex-1">
            <View className="flex flex-row">
              <Text className="text-gray-700 font-psemibold flex-1">
                Enable location
              </Text>
              <Toggle active={active} setActive={setActive} />
            </View>
            <Text className="text-gray-400">Allow app to use location</Text>
          </View>
        </View>
        <TouchableOpacity onPress={logout}>
          <View className="flex flex-row items-center space-x-2">
            <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
              <Image
                source={require("../../assets/icons/cart.png")}
                className="w-6 h-6"
              />
            </View>
            <View className="flex flex-col gap-0">
              <Text className="text-gray-700 font-psemibold">Log out</Text>
              <Text className="text-gray-400">User: {user?.user_id}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Profile;
