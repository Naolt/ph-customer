import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const PharmacyCard = ({ name, address, distance }) => {
  return (
    <TouchableOpacity onPress={() => router.push("pharmacy/1")}>
      <View className="w-full bg-white rounded-3xl p-4 flex flex-row mb-4">
        {/* left */}
        <Image
          source={require("../../assets/images/react-logo.png")}
          className="bg-white w-[75px] h-[75px] rounded-2xl mr-3"
        />
        {/* right */}
        <View className="flex-1 space-y-1">
          {/* pharmacy name */}
          <Text className="font-psemibold text-gray-800 text-base">{name}</Text>
          {/* pharmacy address */}
          <Text className="text-gray-800 text-sm">{address}</Text>
          <View className="flex flex-row items-center justify-between">
            {/* distance in km */}
            <Text className="font-psemibold text-gray-800 text-base">
              {distance} KM
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PharmacyCard;
