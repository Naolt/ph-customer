import { View, Text, Image, ScrollView, TextInput } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import MedicineCard from "@/components/Home/MedicineCard";
import Cart from "@/components/Cart";

const medicineList = [
  { id: 1, name: "Paracetamol", pharmacy: "ABC Pharmacy", price: 10.99 },
  { id: 2, name: "Ibuprofen", pharmacy: "XYZ Pharmacy", price: 8.99 },
  { id: 3, name: "Aspirin", pharmacy: "Pharma Plus", price: 5.99 },
  { id: 4, name: "Amoxicillin", pharmacy: "MediMart", price: 12.99 },
  { id: 5, name: "Lisinopril", pharmacy: "Healthcare Pharmacy", price: 9.99 },
  { id: 6, name: "Atorvastatin", pharmacy: "MediLife", price: 7.99 },
  { id: 7, name: "Metformin", pharmacy: "PharmaCare", price: 6.99 },
  { id: 8, name: "Omeprazole", pharmacy: "Wellness Pharmacy", price: 11.99 },
  { id: 9, name: "Simvastatin", pharmacy: "MediPlus", price: 8.49 },
  { id: 10, name: "Losartan", pharmacy: "PharmaWorld", price: 9.49 },
];

const pharmacy_detail = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View className="h-full w-full">
      <ScrollView className="w-full h-full">
        {/* cover photo */}
        <Image
          source={require("../../../assets/images/react-logo.png")}
          className="bg-white w-full h-48 rounded-2xl mr-3"
        />
        <View className="px-8 space-y-4">
          {/* logo */}
          <View className="relative h-16">
            <Image
              source={require("../../../assets/images/react-logo.png")}
              className="bg-green-500 w-24 h-24 rounded-full absolute -top-1/2"
            />
          </View>
          {/* Pharmacy Detail */}
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-lg font-psemibold text-gray-800">
                ESTD pharmacy
              </Text>
              <Text className="text-sm text-gray-800">
                Addis Ababa, 22 Road
              </Text>
            </View>
            <View>
              <Text className="text-lg font-psemibold text-gray-800">
                Working hours
              </Text>
              <Text className="text-sm text-gray-800">2:00PM - 8:00 AM</Text>
            </View>
          </View>
          {/* search input */}
          <View className="w-full h-16 px-4 bg-black-100 border rounded-full border-gray-700 focus:border-secondary flex flex-row items-center sticky">
            <Text className="text-white font-pbold text-lg">🔍</Text>
            <TextInput
              className="flex-1 text-white font-pregular text-base px-4"
              placeholder="Search"
              placeholderTextColor="gray-500"
            />
            <View className="border-2 rounded-full p-2">
              <Image
                source={require("../../../assets/icons/Filter.png")}
                className="w-6 h-6"
              />
            </View>
          </View>
          {/* Medicine list */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {medicineList.map((data) => (
              <MedicineCard {...data} key={data.id} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View className="w-full px-8 bg-black/[0.8]">
        <Cart />
      </View>
    </View>
  );
};

export default pharmacy_detail;
