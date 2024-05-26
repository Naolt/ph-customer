import { View, Text } from "react-native";
import React from "react";

const RadioButton = ({ isActive }) => {
  return (
    <View
      style={{
        borderColor: isActive ? "#2563EB" : "#ddd",
      }}
      className="h-6 w-6 rounded-full items-center justify-center border"
    >
      <View
        style={{
          backgroundColor: isActive ? "#2563EB" : "#ccc",
        }}
        className="w-4 h-4 rounded-full"
      ></View>
    </View>
  );
};

export default RadioButton;
