import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import UnstyledButton from "@/components/UnstyledButton";
import OrderCount from "@/components/Home/OrderCount";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScrollView className="w-full h-full">
      {/* product photo */}
      <Image
        source={require("../../../assets/images/react-logo.png")}
        className="bg-white w-full h-48 rounded-2xl mr-3 mb-4"
      />
      {/* Prdouct Detail */}
      <View className="px-8 space-y-4">
        <View className="space-y-1">
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-psemibold text-gray-800">
              Zinc Magnesium
            </Text>
            <Text className="text-lg font-psemibold text-gray-800">
              Brand: Ethad
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-base text-gray-800">ESTD pharmacy</Text>
            <Text className="text-base text-gray-800">Made In Ethiopia</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-lg font-psemibold text-gray-800">
            ETB 250.99
          </Text>
          {/*<UnstyledButton
            title="Add to cart"
            containerStyles="w-fit bg-blue-600 px-3 py-2 rounded-full"
            textStyles="text-white text-sm"
            handlePress={() => {}}
            isLoading={false}
				  />*/}
          <OrderCount />
        </View>

        {/* divider */}
        <View className="w-full h-1 bg-gray-200" />
        {/* Product Description */}
        <View className="space-y-1">
          <Text className="text-lg font-psemibold text-gray-800">
            Description
          </Text>
          <Text className="text-base text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nisi ut
            eum sed, quod fugiat maxime dignissimos ad, iure perspiciatis quia
            esse vero necessitatibus nemo dolor quas qui facere architecto!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe modi
            aperiam alias labore neque dicta natus quas veniam eveniet nemo.
            Quas ad exercitationem nobis dolore magnam quia labore soluta!
            Deserunt!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
