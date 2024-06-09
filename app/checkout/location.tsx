import LocationPicker from "@/components/Location/location-picker";
import { CartContext } from "@/providers/CartProvider";
import { LocationContext } from "@/providers/LocationProvider";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const LocationPickerScreen = () => {
  const { location: defaultLocation } = useContext(LocationContext);
  const { cartState, cartDispatch } = useContext(CartContext);

  const handleLocationPicked = (location) => {
    cartDispatch({
      type: "UPDATE_ORDER_DETAIL",
      payload: {
        ...cartState.orderDetail,
        latitude: location.latitude || defaultLocation.latitude || "",
        longitude: location.longitude || defaultLocation.longitude || "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <LocationPicker onLocationPicked={handleLocationPicked} />
      {/*{pickedLocation && (
        <Text>
          Picked Location: {pickedLocation.latitude}, {pickedLocation.longitude}
        </Text>
      )}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocationPickerScreen;
