import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const register = () => {
  return (
    <SafeAreaView>
      <View className="justify-around items-center h-full pt-4  px-4">
        <View className="w-full">
          <Text className="text-2xl font-psemibold text-gray-800">
            Login to your account
          </Text>

          <FormField
            title={"Phone Number"}
            placeholder={"Enter your phone number"}
            handleChangeText={() => {}}
            otherStyles={"mt-10"}
            value={""}
            key={"2"}
            type={"phone"}
          />
          <FormField
            title={"Password"}
            placeholder={"Enter your password"}
            handleChangeText={() => {}}
            otherStyles={"mt-10"}
            value={""}
            key={"3"}
            type={"password"}
          />
        </View>

        <CustomButton
          title={"Continue"}
          handlePress={() => router.push("home")}
          containerStyles={"w-full bg-blue-500 mt-4"}
          textStyles={"text-white"}
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default register;
