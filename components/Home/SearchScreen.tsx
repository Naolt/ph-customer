import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Tab from "../Tab";
import MedicineCard from "./MedicineCard";
import PharmacyCard from "./PharmacyCard";
import Cart from "../Cart";
import { FilterContext } from "@/providers/FilterProvider";
import { UserContext } from "@/providers/AuthProvider";
import api from "@/api";
import { Product } from "@/types";

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState("medicine");
  const { filter } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [medicineList, setMedicineList] = useState<Product[]>([]);
  const [pharmacyList, setPharmacyList] = useState([]);

  // fetch medicine data
  const fetchMedicineData = async () => {
    setLoading(true);
    const data = {
      searchterm: filter.searchTerm,
      ...filter,
    };
    delete data["searchTerm"];
    try {
      const response = await api.post(
        "https://back-end-pharma-hub-l8df.onrender.com/api/inventory/filterProducts/1/100",
        data
      );
      setLoading(false);
      setMedicineList(
        response?.data?.data.map((item) => ({
          productId: item.inventory.product.id,
          productName: item.inventory.product.name,
          productBrand: item.inventory.product.brand,
          productDescription: item.inventory.product.description,
          productManufacturedCountry:
            item.inventory.product.manufacturedCountry,
          productCategoryId: item.inventory.product.categoryId,
          productUserId: item.inventory.product.userId,
          pharmacyId: item.pharmacyId,
          pharmacyName: item.pharmacyName,
          totalQuantity: item.totalQuantity,
          inventoryId: item.inventory.id,
          inventoryBatchNo: item.inventory.batchNo,
          inventorySellingPrice: item.inventory.sellingPrice,
          inventoryIsExpired: item.inventory.isExpired,
          inventoryVisibility: item.inventory.visibility,
          inventoryIsPrescriptionRequired:
            item.inventory.isPrescriptionRequired,
          inventoryImage: item.inventory.image,
          inventoryDiscount: item.inventory.discount,
        }))
      );
    } catch (error) {
      setLoading(false);
      console.log("Error Fetching Products", error?.response?.data);
    }
  };

  // fetch pharmacy data
  const fetchPharmacyData = async () => {
    try {
      const response = await api.get(
        `https://back-end-pharma-hub.onrender.com/pharmacy/searchByName?pharmacy_name=${filter.searchTerm}`
      );

      console.log("Pharmacy Data", JSON.stringify(response?.data.data));
      setPharmacyList(response?.data?.data);
    } catch (error) {
      console.log("Error Searching Pharmacy", error?.response?.data);
    }
  };

  useEffect(() => {
    fetchMedicineData();
    fetchPharmacyData();

    return () => {
      setMedicineList([]);
      setPharmacyList([]);
    };
  }, [filter.searchTerm]);

  return (
    <View className="w-full h-full pb-20 mt-5">
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

      {loading ? (
        <View className="h-16 w-full rounded-lg mb-4 animate-pulse items-center justify-center">
          <ActivityIndicator animating={true} color="#0000ff" size="large" />
        </View>
      ) : activeTab == "medicine" ? (
        <FlatList
          data={medicineList}
          keyExtractor={(item) => item.inventoryId.toString()}
          renderItem={({ item }) => <MedicineCard {...item} />}
          ListEmptyComponent={
            <Text className="text-center text-lg text-primary font-psemibold">
              No Product Found
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={pharmacyList}
          keyExtractor={(item) => item.pharmacy_id.toString()}
          renderItem={({ item }) => <PharmacyCard {...item} />}
          ListEmptyComponent={
            <Text className="text-center text-lg text-primary font-psemibold">
              No Pharmacy Found
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SearchScreen;
