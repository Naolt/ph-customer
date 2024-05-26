import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Tab = ({
  title,
  activeTab,
  setActiveTab,
}: {
  title: string;
  activeTab: string;
  setActiveTab: (val: string) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => setActiveTab(title)}>
      <View
        style={{
          backgroundColor: activeTab == title ? "#3B82F6" : "white",
        }}
        className="w-fit px-4 py-2 rounded-full"
      >
        <Text
          className="text-lg font-medium capitalize"
          style={{ color: activeTab == title ? "white" : "#374151" }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tab;
