import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { FilterContext } from "@/providers/FilterProvider";
import axios from "axios";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import api from "@/api";

const priceData = [
  { id: 100, name: "10-20" },
  { id: 200, name: "20-30" },
  { id: 300, name: "30-100" },
];

const PharmacyFilter = ({ filter, setFilter, closeModal }) => {
  const priceHolder = priceData.find((price) => price.name == filter.price);
  const [tempFilter, setTempFilter] = useState({
    searchTerm: filter.searchTerm,
    category: [...filter.category],
    brand: [...filter.brand],
    price: priceHolder ? priceHolder.id : "",
    pharmacy: [...filter.pharmacy],
  });
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([...priceData]);

  const handleFilter = () => {
    const priceValue = priceData.find((price) => price.id == tempFilter.price);
    setFilter({
      searchTerm: tempFilter.searchTerm,
      category: [...tempFilter.category],
      brand: [...tempFilter.brand],
      price: priceValue ? priceValue.name : "",
      pharmacy: [...tempFilter.pharmacy],
    });
    closeModal();
  };

  const clearFilters = () => {
    setTempFilter({
      searchTerm: filter.searchTerm,
      category: [],
      brand: [],
      price: "",
      pharmacy: [...tempFilter.pharmacy],
    });
    setFilter({
      ...tempFilter,
    });
  };
  useEffect(() => {
    // Fetch categories
    api
      .get("https://back-end-pharma-hub-l8df.onrender.com/api/category/all")
      .then((response) => {
        setCategories(response.data);
        console.log("Categories", response.data);
      })
      .catch((error) => {
        console.log("Error Fetching Categories", error);
      });
  }, []);

  console.log(tempFilter);
  return (
    <View className="relative  px-4 items-center py-8">
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
      </ScrollView>
      <View className="flex flex-row gap-4 mt-4">
        {/*<CustomButton
          title={"Clear Filter"}
          handlePress={clearFilters} // Navigate to home screen
          containerStyles={"flex-1 bg-gray-500 mr-2"}
          textStyles={"text-white"}
          isLoading={false}
        />*/}

        <Button onPress={clearFilters} mode="outlined" className="flex-1">
          Clear Filter
        </Button>
        <Button onPress={handleFilter} mode="contained" className="flex-1">
          Apply Filter
        </Button>

        {/*<CustomButton
          title={"Apply Filter"}
          handlePress={handleFilter} // Navigate to home screen
          containerStyles={"flex-1 bg-blue-500"}
          textStyles={"text-white"}
          isLoading={false}
        />*/}
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

export default PharmacyFilter;
