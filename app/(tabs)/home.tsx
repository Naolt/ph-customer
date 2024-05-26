import { View, Text, TextInput, Image, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/components/Home/HomeScreen";
import SearchScreen from "@/components/Home/SearchScreen";

const Home = () => {
  return (
    <SafeAreaView className="bg-custom-blue">
      <View className="h-full w-full px-8 space-y-6 ">
        {/* search input */}
        <View className="w-full h-16 px-4 bg-black-100 border rounded-full border-gray-700 focus:border-secondary flex flex-row items-center">
          <Text className="text-white font-pbold text-lg">🔍</Text>
          <TextInput
            className="flex-1 text-white font-pregular text-base px-4"
            placeholder="Search"
            placeholderTextColor="gray-500"
          />
          <View className="border-2 rounded-full p-2">
            <Image
              source={require("../../assets/icons/Filter.png")}
              className="w-6 h-6"
            />
          </View>
        </View>
        {/* Home screen */}
        {/*<HomeScreen />*/}
        <SearchScreen />
      </View>
    </SafeAreaView>
  );
};

export default Home;
