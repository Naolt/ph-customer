import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toggle from "@/components/Toggle";
import { router } from "expo-router";

const Profile = () => {
  const [active, setActive] = React.useState(false);
  return (
    <SafeAreaView>
      <ScrollView className="px-8 py-4 space-y-4">
        <Text className="text-lg text-gray-900 font-psemibold text-center mb-4">
          Profile
        </Text>
        <TouchableOpacity onPress={() => router.push("EditProfile")}>
          <View className="flex flex-row items-center space-x-2">
            <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
              <Image
                source={require("../../assets/icons/cart.png")}
                className="w-6 h-6"
              />
            </View>
            <View className="flex flex-col gap-0">
              <Text className="text-gray-700 font-psemibold">
                Account information
              </Text>
              <Text className="text-gray-400">
                Change username and password
              </Text>
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
        <TouchableOpacity>
          <View className="flex flex-row items-center space-x-2">
            <View className="bg-gray-200 w-8 h-8 items-center justify-center rounded-full">
              <Image
                source={require("../../assets/icons/cart.png")}
                className="w-6 h-6"
              />
            </View>
            <View className="flex flex-col gap-0">
              <Text className="text-gray-700 font-psemibold">Log out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Profile;
