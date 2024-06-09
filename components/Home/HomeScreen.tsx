import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AdSpace from "./AdSpace";
import api from "@/api";
import { LocationContext } from "@/providers/LocationProvider";
import { Category } from "@/types";
import { FilterContext } from "@/providers/FilterProvider";

const HomeScreen = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [nearByPharmacies, setNearByPharmacies] = React.useState<Pharmacy[]>(
    []
  );
  const { location } = React.useContext(LocationContext);
  const { filter, setFilter } = React.useContext(FilterContext);

  console.log("Location", location);

  useEffect(() => {
    // Fetch categories
    api
      .get("https://back-end-pharma-hub-l8df.onrender.com/api/category/all")
      .then((response) => {
        setCategories(response.data);
        console.log("Categories", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
    // Fetch nearby pharmacies
    api
      .post("https://back-end-pharma-hub.onrender.com/pharmacy/nearby", {
        latitude: location?.latitude,
        longitude: location?.longitude,
      })
      .then((response) => {
        setNearByPharmacies(response?.data);
        console.log(
          "Nearby pharmacies",
          JSON.stringify(response?.data, null, 2)
        );
      })
      .catch((error) => {
        console.log("Error Fetching Nearby Pharmacies", error);
      });
  }, [location]);

  //console.log("Categories", categories);

  return (
    <ScrollView className="w-full space-y-6 pb-20 mt-5">
      {/* Adsection */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          gap: 8,
        }}
      >
        {/* AddSpace component */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <AdSpace key={item} />
        ))}
      </ScrollView>
      {/* Categories */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Categories</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Category component */}
          {categories.map((item: Category) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setFilter({ ...filter, category: item.name });
              }}
            >
              <View className="flex items-center gap-1">
                <View
                  key={item.id}
                  className="w-24 h-24 bg-gray-500 rounded-full overflow-hidden"
                >
                  <Image
                    src={item?.image || ""}
                    className="w-full h-full rounded-full"
                  />
                </View>
                <Text className="text-sm text-gray-800 capitalize w-24 text-center">
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Near by pharmacies */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Near by pharmacies</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Pharmacy component */}
          {nearByPharmacies.map((item) => (
            <View className="space-y-1">
              <View className="w-32 h-32 bg-gray-500 rounded-lg" key={item}>
                <Image
                  source={require("../../assets/images/react-logo.png")}
                  className="w-full h-full"
                />
              </View>
              <Text className="w-32 overflow-clip text-clip font-pmedium text-sm">
                {item?.pharmacy_name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Discount offers */}
      <View className="w-full space-y-4">
        <Text className="text-lg font-pmedium">Discount offers</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* Discount component */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <View className="space-y-1">
              <View className="w-32 h-32 bg-gray-500 rounded-lg" key={item}>
                <Image
                  source={require("../../assets/images/react-logo.png")}
                  className="w-full h-full"
                />
              </View>
              <Text className="w-32 overflow-clip text-clip font-pregular text-sm">
                Paracetamol
              </Text>
              <View className="w-32 flex flex-row items-center">
                <Text className="overflow-clip text-xs text-gray-500 text-clip font-pregular mr-1 ">
                  ETB 20.00
                </Text>
                <Text className="text-red-500 text-xs font-pregular">
                  20% off{" "}
                </Text>
              </View>
              <Text className="overflow-clip text-clip text-gray-900 line-through font-pregular text-xs mr-2">
                ETB 20.00
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="h-8"></View>
    </ScrollView>
  );
};

export default HomeScreen;
