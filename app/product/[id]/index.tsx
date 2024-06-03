import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import UnstyledButton from "@/components/UnstyledButton";
import OrderCount from "@/components/Home/OrderCount";
import axios from "axios";
import { UserContext } from "@/providers/AuthProvider";
import { set } from "react-hook-form";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({
    productName: "",
    pharmacyName: "",
    image: "",
    unitPrice: 0,
    brand: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://back-end-pharma-hub-l8df.onrender.com/api/inventory/getByInventoryId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accesstoken}`,
          },
        }
      )
      .then((response) => {
        console.log("Product Data:", response.data);
        setLoading(false);
        setProduct(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView className="w-full h-full">
          {/* product photo */}
          <Image
            src={product.image}
            source={require("../../../assets/images/react-logo.png")}
            className="bg-white w-full h-48 rounded-2xl mr-3 mb-4"
          />
          {/* Prdouct Detail */}
          <View className="px-8 space-y-4">
            <View className="space-y-1">
              <View className="flex flex-row justify-between">
                <Text className="text-lg font-psemibold text-gray-800 capitalize">
                  {product.productName}
                </Text>
                <Text className="text-lg font-psemibold text-gray-800 capitalize">
                  Brand: {product.brand}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-base text-gray-800 capitalize">
                  {product?.pharmacyName}
                </Text>
                <Text className="text-base text-gray-800 capitalize">
                  Made In Ethiopia
                </Text>
              </View>
            </View>

            <View className="flex flex-row justify-between">
              <Text className="text-lg font-psemibold text-gray-800">
                ETB {product.unitPrice?.toFixed(2)}
              </Text>
              {/*<UnstyledButton
            title="Add to cart"
            containerStyles="w-fit bg-blue-600 px-3 py-2 rounded-full"
            textStyles="text-white text-sm"
            handlePress={() => {}}
            isLoading={false}
				  />*/}
              <OrderCount id={id} />
            </View>

            {/* divider */}
            <View className="w-full h-1 bg-gray-200" />
            {/* Product Description */}
            <View className="space-y-1">
              <Text className="text-lg font-psemibold text-gray-800">
                Description
              </Text>
              <Text className="text-base text-gray-800">
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetail;
