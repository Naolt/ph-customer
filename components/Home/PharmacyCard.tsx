import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { getRoutePolyline } from "@/utils/getRoutePolyline";
import { convertToKm } from "@/utils/convertToKm";
import { LocationContext } from "@/providers/LocationProvider";
import { Pharmacy } from "@/types";

const PharmacyCard = (pharmacy: Pharmacy) => {
  const [distance, setDistance] = useState(0);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    const getDistance = async () => {
      const start = [pharmacy.latitude, pharmacy.longitude];
      const end = [location.latitude, location.longitude];

      const { distance } = await getRoutePolyline(start, end);
      setDistance(convertToKm(distance));
    };
    getDistance();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => router.push(`pharmacy/${pharmacy.pharmacy_id}`)}
    >
      <View className="w-full bg-white rounded-3xl p-4 flex flex-row mb-4">
        {/* left */}
        <Image
          source={require("../../assets/images/react-logo.png")}
          className="bg-white w-[75px] h-[75px] rounded-2xl mr-3"
        />
        {/* right */}
        <View className="flex-1 space-y-1">
          {/* pharmacy name */}
          <Text className="font-psemibold text-gray-800 text-base">
            {pharmacy.pharmacy_name}
          </Text>
          {/* pharmacy address */}
          <Text className="text-gray-800 text-sm">
            {pharmacy.business_address}
          </Text>
          <View className="flex flex-row items-center justify-between">
            {/* distance in km */}
            <Text className="font-psemibold text-gray-800 text-base">
              {distance} KM
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PharmacyCard;
