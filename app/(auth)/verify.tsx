import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const verify = () => {
  const [code, setCode] = useState("");
  return (
    <SafeAreaView>
      <View className="justify-around items-center h-full pt-24  px-4">
        <View className="w-full">
          <View className="w-full items-center justify-center gap-3">
            <Text className="text-2xl font-psemibold text-gray-800">
              Verify your phone number
            </Text>
            <Text className="text-sm font-pregular text-gray-800">
              We sent you a code to verify your phone number
            </Text>
            <Text className="text-base font-pregular text-gray-800">
              Sent to +62 875 875 098
            </Text>
          </View>
          <View className="flex flex-row w-full justify-center items-center">
            <FormField
              title={""}
              placeholder={""}
              handleChangeText={() => {}}
              otherStyles={"w-[80px] mr-2"}
              value={""}
              key={"1"}
            />
            <FormField
              title={""}
              placeholder={""}
              handleChangeText={() => {}}
              otherStyles={"w-[80px] mr-2"}
              value={""}
              key={"2"}
            />
            <FormField
              title={""}
              placeholder={""}
              handleChangeText={() => {}}
              otherStyles={"w-[80px] mr-2"}
              value={""}
              key={"3"}
            />
            <FormField
              title={""}
              placeholder={""}
              handleChangeText={() => {}}
              otherStyles={"w-[80px]"}
              value={""}
              key={"4"}
            />
          </View>
        </View>

        <CustomButton
          title={"Verify"}
          handlePress={() => router.push("/home")}
          containerStyles={"w-full bg-blue-500 mt-4"}
          textStyles={"text-white"}
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default verify;
