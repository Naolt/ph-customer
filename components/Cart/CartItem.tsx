import { View, Text, Image } from "react-native";
import React from "react";
import UnstyledButton from "../UnstyledButton";
import OrderCount from "../Home/OrderCount";

const CartItem = ({
  product_id,
  name = "Sample",
  pharmacy = "XYZ Pharmacy",
  brand,
  pharmacyId,
  price,
  image = "",
  maxQuantity,
}) => {
  return (
    <View className="flex-1 rounded-3xl p-4 flex flex-row">
      {/* left */}
      <Image
        src={image}
        className="bg-white w-[55px] h-[55px] rounded-2xl mr-3"
      />
      {/* right */}
      <View className="flex-1 space-y-1">
        {/* medicine name */}
        <Text className="font-psemibold text-gray-800 text-base capitalize">
          {name}
        </Text>
        {/* product brand */}
        <Text className="font-psemibold text-gray-800 text-base capitalize">
          {brand}
        </Text>
        {/* medicine pharmacy */}
        <Text className="text-gray-800 text-sm capitalize">{pharmacy}</Text>
      </View>
      <View className="flex flex-col items-center justify-between">
        {/* medicine price */}
        <Text className="font-psemibold text-gray-800 text-base">
          ETB {price?.toFixed(2)}
        </Text>
        <OrderCount id={product_id} pharmacyId={pharmacyId} />
      </View>
    </View>
  );
};

export default CartItem;
