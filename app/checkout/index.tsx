import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/CartProvider";
import OrderItem from "@/components/Checkout/OrderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getLocationName } from "@/utils/maputils";
import { LocationContext } from "@/providers/LocationProvider";
import { getTotalPrice } from "@/providers/selectors/cartSelector";
import { getRoutePolyline } from "@/utils/getRoutePolyline";
import { calculateDeliveryFee } from "@/utils/calculateDeliveryFee";
import { convertToKm } from "@/utils/convertToKm";
import { Button } from "react-native-paper";

const Checkout = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState({
    suburb: "",
    county: "",
    state: "",
  });
  const { location: userLocation } = useContext(LocationContext);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const isDelivery = cartState.orderDetail.order_type === "delivery";
  const subTotalPrice = getTotalPrice(cartState.items);
  const [deliveryAddress, setDeliveryAddress] = useState(
    cartState.orderDetail.order_address || ""
  );
  const [additionalNote, setAdditionalNote] = useState(
    cartState.orderDetail.additional_note || ""
  );

  useEffect(() => {
    const fetchLocationName = async () => {
      const name = await getLocationName(
        cartState.orderDetail.latitude || userLocation.latitude,
        cartState.orderDetail.longitude || userLocation.longitude
      );

      setLocationName({
        suburb: name.suburb,
        county: name.county,
        state: name.state,
      });
    };

    fetchLocationName();
    // get location names
  }, [cartState]);

  useEffect(() => {
    const fetchRoute = async () => {
      const { distance: distance } = await getRoutePolyline([
        userLocation.latitude,
        userLocation.longitude,
      ]);

      setDeliveryFee(calculateDeliveryFee(convertToKm(distance)));
    };

    if (isDelivery) fetchRoute();
    // get location names
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (locationName) {
    text = JSON.stringify(locationName);
  }

  // set the subtotal price and delivery fee to the order detail
  useEffect(() => {
    cartDispatch({
      type: "UPDATE_ORDER_DETAIL",
      payload: {
        ...cartState.orderDetail,
        delivery_amount: deliveryFee,
        total_amount: subTotalPrice,
      },
    });
  }, [subTotalPrice, deliveryFee]);

  const handleSumbit = () => {
    cartDispatch({
      type: "UPDATE_ORDER_DETAIL",
      payload: {
        ...cartState.orderDetail,
        order_address: deliveryAddress,
        additional_note: additionalNote,
      },
    });
    router.push("/checkout/payment");
  };

  return (
    <View className="relative h-full w-full pb-[240px]">
      <ScrollView className="mt-4 px-4 ">
        {/*  order list */}
        <ScrollView>
          {cartState.items.map((item) => {
            return <OrderItem {...item} />;
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
                  {" "}
                  {locationName.county}, {locationName.state}
                </Text>
                {!locationName && (
                  <Text className="text-gray-800 font-bold">
                    Waiting for location...
                  </Text>
                )}
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
            handleChangeText={(text) => setDeliveryAddress(text)}
            value={deliveryAddress}
          />
          <FormField
            title="Additional note (optional)"
            placeholder="e.g. ring the bell twice ..."
            otherStyles={"mt-4"}
            type="textarea"
            handleChangeText={(text) => setAdditionalNote(text)}
            value={additionalNote}
          />
        </View>
        {/* Action */}
      </ScrollView>
      <View className="space-y-2 bg-white pt-4 rounded-[32px] absolute bottom-6 w-[92%] self-center">
        <View className="space-y-2  px-3">
          <View className="flex flex-row justify-between">
            <Text className="text-gray-900 font-psemibold">Subtotal</Text>
            <Text className="text-gray-900 font-psemibold ">
              ETB {subTotalPrice.toFixed(2)}
            </Text>
          </View>
          {isDelivery && (
            <View className="flex flex-row justify-between">
              <Text className="text-gray-900 font-psemibold">Delivery fee</Text>
              <Text className="text-gray-900 font-psemibold ">
                ETB {deliveryFee.toFixed(2)}
              </Text>
            </View>
          )}
          <View className="flex flex-row justify-between">
            <Text className="text-lg text-blue-600 font-psemibold">Total</Text>
            <Text className="text-lg text-blue-600 font-psemibold ">
              ETB {(subTotalPrice + deliveryFee).toFixed(2)}
            </Text>
          </View>
        </View>
        <Button mode="contained" onPress={handleSumbit}>
          Place Order
        </Button>
        {/*<CustomButton
          title={"Place Order"}
          containerStyles={"mt-4 rounded-full bg-blue-500"}
          textStyles={"text-white"}
          handlePress={() => {
            router.push("/checkout/payment");
          }}
          isLoading={false}
        />*/}
      </View>
    </View>
  );
};

export default Checkout;
