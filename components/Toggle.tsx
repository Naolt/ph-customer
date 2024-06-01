import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Toggle = ({ active, setActive }) => {
  return (
    <TouchableOpacity onPress={() => setActive((a) => !a)}>
      <View className="w-12 rounded-2xl bg-gray-300 justify-center p-1">
        <View
          className="w-5 h-5 rounded-full"
          style={{
            backgroundColor: active ? "#2563EB" : "gray",
            transform: active ? "translateX(18px)" : "translateX(0px)",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

export default Toggle;
