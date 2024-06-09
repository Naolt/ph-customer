import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationContext } from "@/providers/LocationProvider";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const LocationPicker = ({ onLocationPicked }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { location } = useContext(LocationContext);
  const [initialRegion, setInitialRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const confirmLocationHandler = () => {
    if (selectedLocation) {
      onLocationPicked(selectedLocation);
      router.back();
    } else {
      alert("Please select a location first.");
    }
  };

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={selectLocationHandler}
        >
          {selectedLocation && (
            <Marker title="Selected Location" coordinate={selectedLocation} />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
      <Button
        onPress={confirmLocationHandler}
        mode="contained"
        className="absolute bottom-8"
      >
        Confirm Location
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
