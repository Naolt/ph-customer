import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Tab from "../Tab";
import MedicineCard from "./MedicineCard";
import PharmacyCard from "./PharmacyCard";
import Cart from "../Cart";
import axios from "axios";
import { FilterContext } from "@/providers/FilterProvider";
import { UserContext } from "@/providers/AuthProvider";
import { set } from "react-hook-form";

// test data
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

// test data
const pharmacyList = [
  { id: 1, name: "Walgreens", address: "123 Main St", distance: 2.5 },
  { id: 6, name: "Walgreens", address: "123 Main St", distance: 2.5 },
  { id: 7, name: "CVS Pharmacy", address: "456 Elm St", distance: 3.2 },
  { id: 8, name: "Rite Aid", address: "789 Oak St", distance: 1.8 },
  { id: 9, name: "Walmart Pharmacy", address: "321 Pine St", distance: 5.0 },
  { id: 10, name: "Target Pharmacy", address: "654 Maple St", distance: 4.3 },
  { id: 11, name: "Walgreens", address: "123 Main St", distance: 2.5 },
  { id: 12, name: "CVS Pharmacy", address: "456 Elm St", distance: 3.2 },
  { id: 13, name: "Rite Aid", address: "789 Oak St", distance: 1.8 },
  { id: 14, name: "Walmart Pharmacy", address: "321 Pine St", distance: 5.0 },
  { id: 15, name: "Target Pharmacy", address: "654 Maple St", distance: 4.3 },
  { id: 2, name: "CVS Pharmacy", address: "456 Elm St", distance: 3.2 },
];

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState("medicine");
  const { filter } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [medicineList, setMedicineList] = useState([]);
  const [pharmacyList, setPharmacyList] = useState([]);

  // fetch medicine data
  const fetchMedicineData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://back-end-pharma-hub-l8df.onrender.com/api/inventory/searchProductByProductName/${filter.searchTerm}`,
        { headers: { Authorization: `Bearer ${user.accesstoken}` } }
      );
      setLoading(false);
      console.log("Search Medicine Data", response.data.data);
      setMedicineList(response?.data?.data);
    } catch (error) {
      //console.error(error);
      setLoading(false);
      console.log("Error Fetching Products", error.response.data);
    }
  };

  useEffect(() => {
    fetchMedicineData();
    console.log("I have been called", user.user_id);
  }, [filter.searchTerm]);

  return (
    <View className="w-full h-full pb-20 mt-5 ">
      <View className="absolute bottom-16 w-full">
        <Cart />
      </View>

      {/* Tab */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
        className="mb-5 w-full"
      >
        <Tab
          title="medicine"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          key={1}
        />
        <Tab
          title="pharmacy"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          key={2}
        />
      </View>
      {/* Search Result for medicine */}
      {activeTab == "medicine" && (
        <View className="relative">
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <View>
                <View className="h-16 w-full rounded-lg mb-4 animate-pulse items-center justify-center">
                  <ActivityIndicator
                    animating={true}
                    color="#0000ff"
                    size="large"
                  />
                </View>
              </View>
            ) : medicineList.length > 0 ? (
              medicineList?.map((data) => (
                <MedicineCard {...data} key={data.id} />
              ))
            ) : (
              <Text className="text-center text-lg text-primary font-psemibold">
                No Product Found
              </Text>
            )}
          </ScrollView>
        </View>
      )}
      {/* Search Result for doctor */}
      {activeTab == "pharmacy" && (
        <View className="pb-40 h-full">
          <ScrollView showsVerticalScrollIndicator={false}>
            {pharmacyList.map((data) => (
              <PharmacyCard {...data} key={data.id} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
