import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { CartContext } from "@/providers/CartProvider";
import { getItemById } from "@/providers/selectors/cartSelector";

const OrderCount = ({ id }) => {
  const { cartDispatch, cartState } = useContext(CartContext);
  const item = getItemById(cartState.items, id);

  console.log("Item:", item, id);

  const onAdd = () => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  const onRemove = () => {
    cartDispatch({
      type: "REMOVE_ONE_FROM_CART",
      payload: item.id,
    });
  };

  return (
    <View className="flex flex-row gap-2 items-center">
      <TouchableOpacity onPress={onRemove}>
        <View className="p-[2px] rounded-lg border border-blue-500">
          <Image
            source={require("../../assets/icons/minus.png")}
            className="w-6 h-6"
          />
        </View>
      </TouchableOpacity>
      <Text className="text-gray-800 font-psemibold text-lg">
        {item?.quantity}
      </Text>
      <TouchableOpacity onPress={onAdd}>
        <View className="p-[2px] rounded-lg bg-blue-500">
          <Image
            source={require("../../assets/icons/plus-white.png")}
            className="w-6 h-6 "
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCount;
