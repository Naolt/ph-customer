import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/components/Home/HomeScreen";
import SearchScreen from "@/components/Home/SearchScreen";
import { FilterContext } from "@/providers/FilterProvider";
import { Modal, Portal } from "react-native-paper";
import PharmacyFilter from "@/components/Pharmacy/ProductFilter";

const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  margin: 20,
};

const Home = () => {
  const { filter, setFilter } = React.useContext(FilterContext);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const hasFilter = Object.values(filter).some((item) => item.length > 0);

  return (
    <SafeAreaView className="bg-custom-blue">
      <View className="h-full w-full px-4 space-y-6 ">
        {/* search input */}
        <View className="w-full h-16 px-4 bg-black-100 border rounded-full border-gray-700 focus:border-secondary flex flex-row items-center">
          <Text className="text-white font-pbold text-lg">🔍</Text>
          <TextInput
            className="flex-1 text-gray-900 font-pregular text-base px-4"
            placeholder="Search"
            placeholderTextColor="gray-500"
            value={filter.searchTerm}
            onChangeText={(text) => {
              setFilter({ ...filter, searchTerm: text });
            }}
          />
          <TouchableOpacity onPress={showModal}>
            <View className="border-2 rounded-full p-2">
              <Image
                source={require("../../assets/icons/Filter.png")}
                className="w-6 h-6"
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Home screen */}
        {!hasFilter ? <HomeScreen /> : <SearchScreen />}
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
    </SafeAreaView>
  );
};

export default Home;
