import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import UnstyledButton from "../UnstyledButton";
import { router } from "expo-router";
import { CartContext } from "@/providers/CartProvider";
import OrderCount from "./OrderCount";
import { getItem } from "@/providers/selectors/cartSelector";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Product } from "@/types";
import Icon from "react-native-vector-icons/FontAwesome";

const MedicineCard = (product: Product) => {
  const { cartDispatch, cartState } = useContext(CartContext);
  const navigation = useNavigation();
  const itemCount =
    getItem(cartState.items, {
      product_id: product.productId,
      pharmacy_id: product.pharmacyId,
    })?.quantity || 0;

  const handleProductPress = () => {
    navigation.navigate("productDetail", { product });
  };

  return (
    <TouchableOpacity onPress={handleProductPress}>
      <View className="w-full bg-white rounded-3xl p-4 flex flex-row mb-4">
        {/* left */}
        {product.inventoryIsPrescriptionRequired && (
          <View className="bg-black/50 p-2 absolute top-2 left-2 z-40 rounded-full">
            <Icon name="medkit" size={20} color="#FF0000" />
          </View>
        )}
        <Image
          //source={require("../../assets/images/react-logo.png")}
          src={product.inventoryImage}
          className="bg-white w-[75px] h-[75px] rounded-2xl mr-3"
        />
        {/* right */}
        <View className="flex-1 space-y-1">
          {/* medicine name */}
          <Text className="font-psemibold text-blue-500 text-base">
            {product.productName}
          </Text>

          <Text className="text-gray-800 text-sm">{product.productBrand}</Text>
          {/* medicine pharmacy */}
          <Text className="text-gray-800 text-sm">{product.pharmacyName}</Text>
        </View>
        <View className="flex flex-col justify-between items-end">
          <Text className="font-psemibold text-gray-800 text-base">
            ETB {product.inventorySellingPrice?.toFixed(2)}
          </Text>
          <View className="flex flex-row items-center justify-between">
            {/* medicine price */}

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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MedicineCard;
