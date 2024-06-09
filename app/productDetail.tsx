import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import OrderCount from "@/components/Home/OrderCount";
import { useRoute } from "@react-navigation/native";
import { Product } from "@/types";
import { getItem } from "@/providers/selectors/cartSelector";
import { CartContext } from "@/providers/CartProvider";
import { Button } from "react-native-paper";
import Cart from "@/components/Cart";

const ProductDetail = () => {
  const route = useRoute();
  const { product } = route.params as { product: Product };
  const { cartDispatch, cartState } = useContext(CartContext);
  const itemCount =
    getItem(cartState.items, {
      product_id: product.productId,
      pharmacy_id: product.pharmacyId,
    })?.quantity || 0;

  return (
    <View className="h-full">
      <View className="absolute bottom-0 w-full px-4">
        <Cart />
      </View>
      <ScrollView className="w-full h-full">
        {/* product photo */}
        <Image
          src={product.inventoryImage}
          //source={require("../../../assets/images/react-logo.png")}
          className="bg-white w-full h-48 rounded-2xl mr-3 mb-4"
        />
        {/* Prdouct Detail */}
        <View className="px-8 space-y-4">
          <View className="space-y-1">
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-psemibold text-blue-500 capitalize">
                {product.productName}
              </Text>
              <Text className="text-lg font-psemibold text-gray-800 capitalize">
                Brand: {product.productBrand}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base text-gray-800 capitalize">
                {product?.pharmacyName}
              </Text>
              <Text className="text-base text-gray-800 capitalize">
                Made In {product.productManufacturedCountry || "N/A"}
              </Text>
            </View>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-lg font-psemibold text-gray-800">
              ETB {product.inventorySellingPrice?.toFixed(2)}
            </Text>
            {itemCount == 0 ? (
              <Button
                mode="contained"
                //className="bg-blue-600"
                disabled={
                  !(
                    cartState.items.length === 0 ||
                    product.pharmacyId === cartState.items[0].pharmacyId
                  )
                }
                loading={false}
                onPress={() => {
                  cartDispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      product_id: product.productId as any,
                      price: product.inventorySellingPrice,
                      quantity: 1,
                      brand: product.productBrand,
                      image: product.inventoryImage,
                      pharmacy: product.pharmacyName,
                      name: product.productName,
                      maxQuantity: product.totalQuantity,
                      pharmacyId: product.pharmacyId,
                      isPrescriptionRequired:
                        product.inventoryIsPrescriptionRequired,
                    }, // assuming each product has a unique id
                  });
                }}
              >
                <Text>Add to cart</Text>
              </Button>
            ) : (
              //<UnstyledButton
              //  title="Add to cart"
              //  containerStyles="w-fit bg-blue-600 px-3 py-2 rounded-full"
              //  textStyles="text-white text-sm"

              ///>
              <OrderCount
                id={product.productId}
                pharmacyId={product.pharmacyId}
              />
            )}
          </View>

          {/* divider */}
          <View className="w-full h-1 bg-gray-200" />
          {/* Product Description */}
          <View className="space-y-1">
            <Text className="text-lg font-psemibold text-gray-800">
              Description
            </Text>
            <Text className="text-base text-gray-800">
              {product.productDescription}
            </Text>
          </View>
        </View>
        <View className="w-full h-20" />
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
