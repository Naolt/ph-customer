import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Button, RadioButton } from "react-native-paper";
import { CartContext } from "@/providers/CartProvider";
import { router } from "expo-router";

const OrderType = () => {
  const [showError, setShowError] = useState(false);
  const [showDeliveryError, setShowDeliveryError] = useState(false);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [selectedOrderType, setSelectedOrderType] = useState(
    cartState.orderDetail.order_type || ""
  );

  useEffect(() => {
    if (selectedOrderType === "delivery" && checkPrescriptionItems()) {
      setSelectedOrderType("");
      setShowDeliveryError(true);
    } else {
      setShowDeliveryError(false);
    }
  }, [selectedOrderType]);

  const checkPrescriptionItems = () => {
    return cartState.items.some((item) => item.isPrescriptionRequired);
    //return true;
  };

  const handleContinue = () => {
    // update the cart state with the selected order type
    cartDispatch({
      type: "UPDATE_ORDER_DETAIL",
      payload: {
        ...cartState.orderDetail,
        order_type: selectedOrderType,
      },
    });

    // navigate to the next screen
    router.push("checkout");
  };

  return (
    <View className="px-8 py-8 space-y-4 h-full">
      <Text className="text-center font-psemibold mb-4 text-lg ">
        Choose Order Type
      </Text>
      <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
        <View className="flex-1">
          <Text className="text-gray-900 font-pmedium">Delivery</Text>
        </View>
        {/* radio */}
        <RadioButton
          value="Delivery"
          status={selectedOrderType === "delivery" ? "checked" : "unchecked"}
          onPress={() => setSelectedOrderType("delivery")}
          disabled={checkPrescriptionItems()}
        />
      </View>

      <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
        <View className="flex-1">
          <Text className="text-gray-900 font-pmedium">Pickup</Text>
        </View>
        {/* radio */}
        <RadioButton
          value="Pickup"
          status={selectedOrderType === "pickup" ? "checked" : "unchecked"}
          onPress={() => setSelectedOrderType("pickup")}
        />
      </View>
      {showError && (
        <Text style={{ color: "red" }}>Please select an order type.</Text>
      )}
      {checkPrescriptionItems() && (
        <Text style={{ color: "red" }}>
          Delivery is not available for items that require a prescription.
        </Text>
      )}
      {selectedOrderType == "delivery" && !showDeliveryError && (
        <Text className="text-gray-700 ">
          You will be paying the delivery fee in cash.
        </Text>
      )}
      <View>
        <Button
          mode="contained"
          onPress={() => {
            if (selectedOrderType) {
              setShowError(false);
              handleContinue();
            } else {
              setShowError(true);
            }
          }}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};

export default OrderType;
