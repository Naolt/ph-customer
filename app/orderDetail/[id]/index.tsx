import { View, Text, Image, ScrollView, TextInput } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import MedicineCard from "@/components/Home/MedicineCard";
import Cart from "@/components/Cart";
import OrderItem from "@/components/Checkout/OrderItem";

const orderItemList = [
  {
    id: 1,
    name: "Paracetamol",
    price: 10.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Ibuprofen",
    price: 8.99,
    quantity: 2,
  },
  {
    id: 3,
    name: "Aspirin",
    price: 5.99,
    quantity: 3,
  },
];
const orderDetail = {
  id: 1,
  pharmacy: "XYZ Pharmacy",
  status: "Delivered",
  total: 100.0,
  date: "2021-10-10",
  items: orderItemList,
};
const statusColor = {
  delivered: "#22C55E",
  pending: "#F97316",
  canceled: "#EF4444",
};

const OrderDetail = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View className="h-full w-full px-4">
      <ScrollView className="w-full h-full">
        <View className="py-4 space-y-4">
          <View className="bg-white p-4 rounded-3xl flex flex-row items-center">
            <View className="flex-1">
              <Text className="text-lg text-gray-900 font-psemibold">
                Order ID: {orderDetail.id}
              </Text>
              <Text className="text-sm text-gray-500">
                {orderDetail.pharmacy}
              </Text>
              <Text
                className="text-sm text-gray-500"
                style={{ color: statusColor[orderDetail.status.toLowerCase()] }}
              >
                {orderDetail.status}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">{orderDetail.date}</Text>

              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-900 font-psemibold">
                  Total: ETB {orderDetail.total}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-4 space-y-2">
            <Text className="text-lg text-gray-900 font-psemibold">
              Order Items
            </Text>
            <View className="bg-white p-4 rounded-3xl">
              {orderDetail.items.map((item) => (
                <OrderItem />
              ))}
            </View>
          </View>
          {/* Price Detail */}
          <View className="bg-blue-500 p-4 rounded-3xl">
            <View className="flex flex-row justify-between mt-4">
              <Text className="text-gray-100 font-psemibold">Subtotal</Text>
              <Text className="text-gray-100 font-psemibold ">ETB 280.0</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-100 font-psemibold">Delivery fee</Text>
              <Text className="text-gray-100 font-psemibold ">ETB 80.0</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg text-white font-psemibold">Total</Text>
              <Text className="text-lg text-white font-psemibold ">
                ETB 360.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;
