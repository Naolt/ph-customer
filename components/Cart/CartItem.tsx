import { View, Text, Image } from "react-native";
import React from "react";
import UnstyledButton from "../UnstyledButton";
import OrderCount from "../Home/OrderCount";

const CartItem = ({
  id,
  name = "Sample",
  pharmacy = "XYZ Pharmacy",
  price,
}) => {
  return (
    <View className="flex-1 rounded-3xl p-4 flex flex-row">
      {/* left */}
      <Image
        source={require("../../assets/images/react-logo.png")}
        className="bg-white w-[55px] h-[55px] rounded-2xl mr-3"
      />
      {/* right */}
      <View className="flex-1 space-y-1">
        {/* medicine name */}
        <Text className="font-psemibold text-gray-800 text-base">{name}</Text>
        {/* medicine pharmacy */}
        <Text className="text-gray-800 text-sm">{pharmacy}</Text>
        <View className="flex flex-row items-center justify-between">
          {/* medicine price */}
          <Text className="font-psemibold text-gray-800 text-base">
            ETB {price}
          </Text>
          <OrderCount id={id} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;
