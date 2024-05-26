import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const orders = [
  {
    id: 1234,
    date: "2021-07-01",
    total: 100,
    status: "Delivered",
    pharmacy: "ABC Pharmacy",
  },
  {
    id: 1235,
    date: "2021-07-02",
    total: 200,
    status: "Pending",
    pharmacy: "DEF Pharmacy",
  },
  {
    id: 1236,
    date: "2021-07-03",
    total: 300,
    status: "Canceled",
    pharmacy: "GHI Pharmacy",
  },
];

const statusColor = {
  delivered: "#22C55E",
  pending: "#F97316",
  canceled: "#EF4444",
};

const Orders = () => {
  return (
    <SafeAreaView>
      <View className="px-8">
        <Text className="text-lg text-gray-900 font-psemibold text-center my-8">
          Orders
        </Text>
        <ScrollView className="space-y-4">
          {orders.map((order) => (
            <TouchableOpacity
              onPress={() => router.push(`orderDetail/${order.id}`)}
              key={order.id}
            >
              <View
                key={order.id}
                className="flex flex-row bg-white p-3 items-center space-x-2 rounded-3xl"
              >
                <Image
                  source={require("../../assets/images/react-logo.png")}
                  className="w-14 h-14"
                />
                <View className="flex-1">
                  <Text className="text-gray-900 font-psemibold">
                    Order ID: {order.id}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {order.pharmacy}
                  </Text>

                  <Text
                    className="text-sm"
                    style={{
                      color: statusColor[order.status.toLowerCase()],
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm text-gray-800 font-psemibold">
                    ETB {order.total.toFixed(2)}
                  </Text>
                  <Text className="text-sm text-gray-500">{order.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
