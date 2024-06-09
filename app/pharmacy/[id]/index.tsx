import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import MedicineCard from "@/components/Home/MedicineCard";
import Cart from "@/components/Cart";
import api from "@/api";
import { Pharmacy } from "@/components/Home/PharmacyCard";
import { format, parseISO } from "date-fns";
import { FilterContext } from "@/providers/FilterProvider";
import { Product } from "@/types";
import { Modal, Portal } from "react-native-paper";
import PharmacyFilter from "@/components/Pharmacy/ProductFilter";

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
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { id } = useLocalSearchParams();

  const [filter, setFilter] = useState<{
    searchTerm: string;
    category: number[];
    brand: number[];
    price: string;
    pharmacy: number[];
  }>({
    searchTerm: "",
    category: [],
    brand: [],
    price: "",
    pharmacy: [parseInt(id.toString())],
  });

  const [pharmacy, setPharmacy] = useState<Pharmacy>({} as Pharmacy);
  const [medicineList, setMedicineList] = useState<Product[]>([]);

  useEffect(() => {
    // fetch pharmacy details
    api
      .get(`https://back-end-pharma-hub.onrender.com/pharmacy/id/${id}`)
      .then((res) => {
        setPharmacy(res.data.data);
        //console.log("Pharmacy Details", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // fetch pharmacy medicines
    const data = {
      searchterm: filter.searchTerm,
      ...filter,
    };
    delete data["searchTerm"];

    api
      .post(
        "https://back-end-pharma-hub-l8df.onrender.com/api/inventory/filterProducts/1/100",
        data
      )
      .then((res) => {
        setMedicineList(
          res?.data?.data.map((item) => ({
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
        console.log("Filter Data: ", JSON.stringify(data, null, 2));
        console.log("Product Data: ", JSON.stringify(res.data, null, 2));
      })
      .catch((err) => {
        console.log(
          "ERROR FETCHINg pharmacy products",
          JSON.stringify(err.response.data, null, 2)
        );
      });
  }, [filter]);

  const openTime = pharmacy?.opening_hour
    ? parseISO(pharmacy.opening_hour)
    : null;
  const closeTime = pharmacy?.closing_hour
    ? parseISO(pharmacy.closing_hour)
    : null;

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View className="h-full w-full">
      <ScrollView className="w-full h-full">
        {/* cover photo */}
        <Image
          source={require("../../../assets/images/react-logo.png")}
          className="bg-white w-full h-48 rounded-2xl mr-3"
        />
        <View className="px-4 space-y-4">
          {/* logo */}
          <View className="relative h-16">
            <Image
              source={require("../../../assets/images/react-logo.png")}
              className="bg-green-500 w-24 h-24 rounded-full absolute -top-1/2"
            />
          </View>
          {/* Pharmacy Detail */}
          <View className="flex flex-row justify-between flex-1">
            <View>
              <Text className="text-lg font-psemibold text-blue-500">
                {pharmacy.pharmacy_name}
              </Text>
              <Text className="text-sm text-gray-800">
                {pharmacy.business_address}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-psemibold text-gray-800">
                Working hours
              </Text>
              <Text className="text-sm text-gray-800">
                {openTime && format(openTime, "hh:mm a")} -{" "}
                {closeTime && format(closeTime, "hh:mm a")}
              </Text>
            </View>
          </View>
          {/* search input */}
          <View className="w-full h-16 px-4 bg-black-100 border rounded-full border-gray-700 focus:border-secondary flex flex-row items-center sticky">
            <Text className="text-white font-pbold text-lg">🔍</Text>
            <TextInput
              className="flex-1 text-gray=900 font-pregular text-base px-4"
              placeholder="Search"
              placeholderTextColor="gray-500"
              onChangeText={(text) =>
                setFilter({ ...filter, searchTerm: text })
              }
              value={filter.searchTerm}
            />
            <TouchableOpacity onPress={showModal}>
              <View className="border-2 rounded-full p-2">
                <Image
                  source={require("../../../assets/icons/Filter.png")}
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* Medicine list */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {medicineList.map((data: Product) => (
              <MedicineCard {...data} key={data.inventoryId} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View className="w-full px-8 bg-black/[0.8]">
        <Cart />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <PharmacyFilter
            closeModal={hideModal}
            filter={filter}
            setFilter={setFilter}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default pharmacy_detail;
