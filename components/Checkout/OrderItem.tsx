import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderItem = () => {
  return (
    <View className="w-full py-3 flex flex-row items-center">
      <Image
        source={require("../../assets/images/react-logo.png")}
        className="w-14 h-14 rounded-full bg-white mr-3"
      />
      <View className="flex-1">
        <Text className="font-psemibold text-gray-800 text-base">
          Zinc Magnesium
        </Text>
        <Text className="text-gray-800 text-sm">ESTD pharmacy</Text>
      </View>
      <Text className="text-gray-800 text-sm">3 x 280.0</Text>
    </View>
  );
};

export default OrderItem;
