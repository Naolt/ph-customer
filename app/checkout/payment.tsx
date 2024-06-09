import { Image, ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import RadioButton from "@/components/RadioButton";
import UnstyledButton from "@/components/UnstyledButton";
import CustomButton from "@/components/CustomButton";
import { Button } from "react-native-paper";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/CartProvider";
import { UserContext } from "@/providers/AuthProvider";
import api from "@/api";
import * as Linking from "expo-linking";
import { LocationContext } from "@/providers/LocationProvider";

export default function Modal() {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { location } = useContext(LocationContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = () => {
    setLoading(true);
    // handle order submit
    const body = {
      ...cartState.orderDetail,
      user_id: user.user_id,
      pharmacy_id: cartState.items[0].pharmacyId,
      prescription: false,
      order_type: cartState.orderDetail.order_type.toLowerCase(),
      latitude: cartState.orderDetail.latitude || location.latitude,
      longitude: cartState.orderDetail.longitude || location.longitude,
      orderDetails: cartState.items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        name: item.name,
        brand_name: item.brand,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
    };

    delete body["delivery_amount"];

    console.log("ORDER BODY", JSON.stringify(body, null, 2));

    api
      .post(
        "https://back-end-pharma-hub-order-service.onrender.com/orders",
        body
      )
      .then((response) => {
        console.log("ORDER CREATED", JSON.stringify(response.data, null, 2));
        if (response.data?.data?.paymentLink) {
          console.log("Payment link", response.data.data.paymentLink);
          Linking.openURL(response.data.data.paymentLink);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error creating response", error);
        setLoading(false);
      });
  };

  const isDelivery = cartState.orderDetail.order_type === "delivery";
  return (
    <View className="h-full pt-6 px-8">
      <View className="space-y-4">
        {/* let the user know the  */}

        {/* payment method */}
        <View className="py-2">
          <Text className="text-center font-psemibold mb-4 text-lg ">
            Payment Method
          </Text>
          <View className="space-y-3">
            <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
              <View className="flex-1 flex flex-row items-center space-x-2">
                <Image
                  source={require("../../assets/images/chapa.png")}
                  //className="w-16"
                  className="w-12 h-12"
                />
                <Text className="text-gray-900 font-pmedium">Chapa</Text>
              </View>
              {/* radio */}
              <RadioButton isActive={true} />
            </View>
          </View>
        </View>
      </View>
      {isDelivery && (
        <Text className=" my-4">
          You will be paying the delivery fee in cash.
        </Text>
      )}
      {/* Action */}
      <Button
        mode="contained"
        onPress={handleOrderSubmit}
        loading={loading}
        disabled={loading}
      >
        Pay
      </Button>
      <StatusBar style="dark" />
    </View>
  );
}
