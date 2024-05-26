import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UnstyledButton from "../UnstyledButton";
import CartItem from "./CartItem";
import { CartContext } from "@/providers/CartProvider";
import { getItemById, getTotalPrice } from "@/providers/selectors/cartSelector";
import { router } from "expo-router";
type Product = {
  id: number;
  name: string;
  pharmacy: string;
  price: number;
};

const medicineList: Product[] = [
  { id: 1, name: "Paracetamol", pharmacy: "ABC Pharmacy", price: 10.99 },
  { id: 2, name: "Ibuprofen", pharmacy: "XYZ Pharmacy", price: 8.99 },
  { id: 3, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 4, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 5, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 7, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 8, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 9, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 10, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
];

const Cart = () => {
  const [opened, setOpened] = React.useState(false);
  const { cartState } = useContext(CartContext);
  console.log("Cart State", cartState);
  const totalPrice = getTotalPrice(cartState.items);
  return (
    <View
      className="absolute z-50 bottom-8 w-full self-center bg-blue-100 rounded-3xl max-h-96 "
      style={{
        elevation: 30,
      }}
    >
      <ScrollView
        className="w-full"
        style={{
          display: opened ? "flex" : "none",
        }}
      >
        {cartState.items.map((prod) => {
          return <CartItem {...prod} />;
        })}
      </ScrollView>
      <View className="bg-blue-600 p-3 rounded-full flex flex-row items-center self-center">
        {/* icon */}
        <TouchableOpacity
          onPress={() => {
            setOpened((opened) => !opened);
          }}
        >
          <View className="rounded-full p-2 bg-gray-200 relative mr-4">
            <Image
              source={require("../../assets/icons/cart.png")}
              className="w-6 h-6"
            />
            <View className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 flex items-center justify-center w-6 h-6">
              <Text className="text-xs text-white">
                {cartState.items.length}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Total Price */}
        <View className="flex-1">
          <Text className="text-white text-lg font-psemibold">
            {totalPrice?.toPrecision(4)} Br
          </Text>
          <Text className="text-white ">+ Delivery fee</Text>
        </View>
        <UnstyledButton
          title="Buy now"
          containerStyles="w-fit bg-white px-3 py-2 rounded-full"
          textStyles="text-blue-600 text-base font-psemibold"
          handlePress={() => {
            router.push("/checkout");
          }}
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Cart;
