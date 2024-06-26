import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { FilterContext } from "@/providers/FilterProvider";
import axios from "axios";
import { set } from "react-hook-form";
import { router } from "expo-router";

const categoryData = [
  { id: 0, name: "Electronics" },
  { id: 1, name: "Fashion" },
  { id: 2, name: "Home" },
  { id: 3, name: "Beauty" },
  { id: 4, name: "Health" },
  { id: 5, name: "Sports" },
];

const brandData = [
  { id: 20, name: "Apple" },
  { id: 14, name: "Samsung" },
  { id: 25, name: "Nike" },
  { id: 37, name: "Adidas" },
  { id: 48, name: "Sony" },
  { id: 50, name: "LG" },
];

const priceData = [
  { id: 100, name: "10-20" },
  { id: 200, name: "20-30" },
  { id: 300, name: "30-100" },
];

const pharmacyData = [
  { id: 440, name: "Pharmacy 1" },
  { id: 4441, name: "Pharmacy 2" },
  { id: 4442, name: "Pharmacy 3" },
  { id: 4443, name: "Pharmacy 4" },
  { id: 4444, name: "Pharmacy 5" },
  { id: 444445, name: "Pharmacy 6" },
];

const Filter = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const priceHolder = priceData.find((price) => price.name == filter.price);
  const [tempFilter, setTempFilter] = useState({
    searchTerm: filter.searchTerm,
    category: [...filter.category],
    brand: [...filter.brand],
    price: priceHolder ? priceHolder.id : "",
    pharmacy: [...filter.pharmacy],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([...brandData]);
  const [prices, setPrices] = useState([...priceData]);
  const [pharmacies, setPharmacies] = useState([...pharmacyData]);

  const handleFilter = () => {
    const priceValue = priceData.find((price) => price.id == tempFilter.price);
    setFilter({
      searchTerm: tempFilter.searchTerm,
      category: [...tempFilter.category],
      brand: [...tempFilter.brand],
      price: priceValue ? priceValue.name : "",
      pharmacy: [...tempFilter.pharmacy],
    });
    router.push("home");
  };

  const clearFilters = () => {
    setTempFilter({
      searchTerm: filter.searchTerm,
      category: [],
      brand: [],
      price: "",
      pharmacy: [],
    });
    setFilter({
      ...tempFilter,
    });
  };
  useEffect(() => {
    // Fetch categories
    axios
      .get("https://back-end-pharma-hub-l8df.onrender.com/api/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(tempFilter);
  return (
    <View className="relative h-full px-4 items-center py-8">
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          display: "flex",
          gap: 16,
        }}
      >
        <View>
          {/* label */}
          <Text className="font-pmedium mb-1">Categories</Text>
          <SectionedMultiSelect
            selectText="Product Category..."
            searchPlaceholderText="Search categories..."
            items={categories}
            styles={{
              chipContainer: styles.container,
              selectToggle: styles.multiSelectBox,
            }}
            IconRenderer={Icon}
            uniqueKey="id"
            colors={{ primary: "#2563EB" }}
            key={1}
            onSelectedItemsChange={(selectedItems) => {
              setTempFilter({ ...tempFilter, category: selectedItems });
            }}
            selectedItems={tempFilter.category}
          />
        </View>

        <View>
          <Text className="font-pmedium mb-1">Product Price...</Text>
          <SectionedMultiSelect
            selectText="Product Price..."
            searchPlaceholderText="Search prices..."
            items={prices}
            styles={{
              chipContainer: styles.container,
              selectToggle: styles.multiSelectBox,
            }}
            IconRenderer={Icon}
            colors={{ primary: "#2563EB" }}
            single={true}
            uniqueKey="id"
            key={3}
            onSelectedItemsChange={(selectedItems) => {
              setTempFilter({ ...tempFilter, price: selectedItems[0] });
            }}
            selectedItems={[tempFilter.price]}
          />
        </View>

        {/* pharmacy */}
        <View>
          <Text className="font-pmedium mb-1">Pharmacies</Text>
          <SectionedMultiSelect
            selectText="Pharmacy..."
            searchPlaceholderText="Search pharmacies..."
            items={pharmacies}
            styles={{
              chipContainer: styles.container,
              selectToggle: styles.multiSelectBox,
            }}
            colors={{ primary: "#2563EB" }}
            IconRenderer={Icon}
            uniqueKey="id"
            key={4}
            onSelectedItemsChange={(selectedItems) => {
              setTempFilter({ ...tempFilter, pharmacy: selectedItems });
            }}
            selectedItems={tempFilter.pharmacy}
          />
        </View>
      </ScrollView>
      <View className="w-full flex flex-row mt-10 absolute bottom-4">
        <CustomButton
          title={"Clear Filter"}
          handlePress={clearFilters} // Navigate to home screen
          containerStyles={"flex-1 bg-gray-500 mr-2"}
          textStyles={"text-white"}
          isLoading={false}
        />
        <CustomButton
          title={"Apply Filter"}
          handlePress={handleFilter} // Navigate to home screen
          containerStyles={"flex-1 bg-blue-500"}
          textStyles={"text-white"}
          isLoading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  multiSelectBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
    padding: 12,
    marginBottom: 12,
  },
});

export default Filter;
