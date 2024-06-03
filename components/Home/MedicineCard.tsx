import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UnstyledButton from "../UnstyledButton";
import { router } from "expo-router";
import { CartContext } from "@/providers/CartProvider";
import OrderCount from "./OrderCount";
import { getItemById } from "@/providers/selectors/cartSelector";

const MedicineCard = ({
  id,
  productName: name,
  pharmacyName: pharmacy,
  unitPrice: price,
  image = "",
}) => {
  const { cartDispatch, cartState } = useContext(CartContext);

  const itemCount = getItemById(cartState.items, id)?.quantity || 0;

  return (
    <TouchableOpacity onPress={() => router.push(`product/${id}`)}>
      <View className="w-full bg-white rounded-3xl p-4 flex flex-row mb-4">
        {/* left */}
        <Image
          //source={require("../../assets/images/react-logo.png")}
          src={image}
          className="bg-white w-[75px] h-[75px] rounded-2xl mr-3"
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
              ETB {price?.toFixed(2)}
            </Text>
            {itemCount == 0 ? (
              <UnstyledButton
                title="Add to cart"
                containerStyles="w-fit bg-blue-600 px-3 py-2 rounded-full"
                textStyles="text-white text-sm"
                handlePress={() => {
                  cartDispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      id,
                      price,
                      quantity: 1,
                      image,
                      pharmacy,
                      name,
                    }, // assuming each product has a unique id
                  });
                }}
                isLoading={false}
              />
            ) : (
              <OrderCount id={id} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MedicineCard;
