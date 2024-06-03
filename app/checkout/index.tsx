import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/CartProvider";
import OrderItem from "@/components/Checkout/OrderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import * as Location from "expo-location";

const Checkout = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const { cartState } = useContext(CartContext);
  return (
    <View className="relative h-full w-full pb-[240px]">
      <ScrollView className="mt-4 px-4 ">
        {/*  order list */}
        <ScrollView>
          {cartState.items.map((item) => {
            return <OrderItem />;
          })}
        </ScrollView>
        {/* delivery Address */}
        <View className="mt-4 space-y-1">
          <Text className="font-psemibold text-gray-800 text-base">
            Deliver to
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("checkout/location");
            }}
          >
            <View className="flex flex-row items-center border border-slate-300 p-2">
              <Image
                source={require("../../assets/images/react-logo.png")}
                className="w-6 h-6 mr-2"
              />
              <View>
                <Text className="text-gray-800 font-psemibold">
                  Current Location
                </Text>
                <Text className="text-gray-600 text-sm">
                  Addis Ababa, Ethiopia
                </Text>
                <Text className="text-gray-800 font-bold">{text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          {/* specific address */}
          <FormField
            title="Enter your address"
            placeholder="e.g. house number,bldg no, floor ..."
            otherStyles={"mt-4"}
          />
          <FormField
            title="Additional note (optional)"
            placeholder="e.g. ring the bell twice ..."
            otherStyles={"mt-4"}
            type="textarea"
          />
        </View>
        {/* Action */}
      </ScrollView>
      <View className="space-y-2 bg-white pt-4 rounded-[32px] absolute bottom-6 w-[92%] self-center">
        <View className="space-y-2  px-3">
          <View className="flex flex-row justify-between">
            <Text className="text-gray-900 font-psemibold">Subtotal</Text>
            <Text className="text-gray-900 font-psemibold ">ETB 280.0</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-gray-900 font-psemibold">Delivery fee</Text>
            <Text className="text-gray-900 font-psemibold ">ETB 80.0</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-lg text-blue-600 font-psemibold">Total</Text>
            <Text className="text-lg text-blue-600 font-psemibold ">
              ETB 360.0
            </Text>
          </View>
        </View>
        <CustomButton
          title={"Place Order"}
          containerStyles={"mt-4 rounded-full bg-blue-500"}
          textStyles={"text-white"}
          handlePress={() => {
            router.push("/checkout/modal");
          }}
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Checkout;
