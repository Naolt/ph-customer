import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useMemo } from "react";
import UnstyledButton from "../UnstyledButton";
import CartItem from "./CartItem";
import { CartContext } from "@/providers/CartProvider";
import { getTotalPrice } from "@/providers/selectors/cartSelector";
import { router } from "expo-router";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button } from "react-native-paper";
import { LocationContext } from "@/providers/LocationProvider";
import { getRoutePolyline } from "@/utils/getRoutePolyline";
import { convertToKm } from "@/utils/convertToKm";
import { calculateDeliveryFee } from "@/utils/calculateDeliveryFee";
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
  const { cartState, cartDispatch } = useContext(CartContext);
  const [distance, setDistance] = React.useState(0);

  console.log("Cart State", cartState);
  const totalPrice = getTotalPrice(cartState.items);

  // get the user's location
  const { location } = useContext(LocationContext);
  console.log("Location", location);

  useEffect(() => {
    const fetchRoute = async () => {
      const { distance: distance } = await getRoutePolyline([
        location.latitude,
        location.longitude,
      ]);

      setDistance(distance);
    };

    fetchRoute();
    // get location names
  }, []);

  return (
    <View
      className="absolute z-50 bottom-8 w-full  self-center bg-gray-200 rounded-[50px] max-h-[800px]  "
      style={{
        elevation: 1000,
      }}
    >
      {/*<ScrollView
        className="w-full"
        style={{
          display: opened ? "flex" : "none",
        }}
      >
        {cartState.items.map((prod) => {
          return <CartItem {...prod} />;
        })}
      </ScrollView>*/}
      {opened && (
        <View className=" absolute -top-96 bg-black/50  w-[1000px] -translate-x-24 -translate-y-[400px] h-[2000px]"></View>
      )}
      <View className="w-full bg-gray-200 rounded-[50px]">
        <SwipeListView
          style={{
            display: opened ? "flex" : "none",
          }}
          className="rounded-3xl bg-gray-200"
          data={cartState.items}
          renderItem={({ item }) => (
            <View className="bg-gray-200">
              <CartItem {...item} />
            </View>
          )}
          renderHiddenItem={({ item }, rowMap) => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                padding: 15,
                height: "100%",
              }}
              onPress={() => {
                cartDispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item });
                rowMap[item.product_id].closeRow();
              }}
            >
              <Image
                source={require("../../assets/icons/delete.png")}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          )}
          leftOpenValue={50}
          keyExtractor={(item) => item?.product_id?.toString()}
        />
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
              {totalPrice?.toFixed(2)} Br
            </Text>
            <Text className="text-white capitalize">
              {/* display pharmacy name here */}
              from: {cartState.items.length > 0 && cartState.items[0].pharmacy}
            </Text>
          </View>
          <UnstyledButton
            title="Buy now"
            containerStyles="w-fit bg-white px-3 py-2 rounded-full"
            textStyles="text-blue-600 text-base font-psemibold"
            handlePress={() => {
              router.push("/order-type");
            }}
            isLoading={false}
            disabled={cartState.items.length === 0}
          />
        </View>
      </View>
    </View>
  );
};

export default Cart;
