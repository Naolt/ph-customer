import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "@/providers/CartProvider";

const OrderItem = ({
  id,
  name,
  pharmacy,
  brand,
  pharmacyId,
  price,
  image = "",
  maxQuantity,
}) => {
  const { cartState } = useContext(CartContext);

  const itemQuantity = cartState.items.find((item) => item.id === id)?.quantity;

  return (
    <View className="w-full py-3 flex flex-row items-center">
      <Image
        source={require("../../assets/images/react-logo.png")}
        className="w-14 h-14 rounded-full bg-white mr-3"
      />
      <View className="flex-1">
        <Text className="font-psemibold text-gray-800 text-base">{name}</Text>
        <Text className="font-psemibold text-gray-600 text-base">{brand}</Text>
        <Text className="text-gray-600 text-sm">{pharmacy}</Text>
      </View>
      <Text className="text-gray-800 text-sm">
        {itemQuantity} x {price.toFixed(2)}
      </Text>
    </View>
  );
};

export default OrderItem;
