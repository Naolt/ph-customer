import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

export default function RootLayout() {
  return (
    <SafeAreaView className="w-full h-full bg-blue-500 ">
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          paddingHorizontal: 24,
        }}
      >
        <View className="justify-center items-center">
          <Image
            source={require("../assets/images/react-logo.png")}
            className="w-48 h-48"
          />
          <Text className="text-4xl font-pbold text-white">PharmaHub</Text>
          <Text className="text-sm font-pregular text-white text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur eum nam eius natus, quas, similique earum
          </Text>
        </View>
        <View className="w-full">
          <CustomButton
            title="Register"
            handlePress={() => router.push("/register")}
            containerStyles={"bg-white mt-8 px-4 rounded-lg w-full"}
            textStyles={"text-blue-500 text-center text-lg"}
          />
          <CustomButton
            title="Log in"
            handlePress={() => router.push("/login")}
            containerStyles={"bg-white mt-8 px-4 rounded-lg w-full"}
            textStyles={"text-blue-500 text-center text-lg"}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
