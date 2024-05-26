import { View, Text, ScrollView } from "react-native";
import React from "react";
import AdSpace from "./AdSpace";

const HomeScreen = () => {
  return (
    <View className="w-full space-y-6">
      {/* Adsection */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          gap: 8,
        }}
      >
        {/* AddSpace component */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <AdSpace key={item} />
        ))}
      </ScrollView>
      {/* Categories */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Categories</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Category component */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <View className="flex items-center gap-1">
              <View
                key={item}
                className="w-24 h-24 bg-gray-500 rounded-full"
              ></View>
              <Text className="text-sm text-gray-800">Hello</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Near by pharmacies */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Near by pharmacies</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Pharmacy component */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <View
              className="w-32 h-32 bg-gray-500 rounded-lg"
              key={item}
            ></View>
          ))}
        </ScrollView>
      </View>
      {/* Discount offers */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Discount offers</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Discount component */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <View
              className="w-32 h-32 bg-gray-500 rounded-lg"
              key={item}
            ></View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
