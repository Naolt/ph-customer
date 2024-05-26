import { Image, ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import RadioButton from "@/components/RadioButton";
import UnstyledButton from "@/components/UnstyledButton";
import CustomButton from "@/components/CustomButton";
export default function Modal() {
  const languages = ["English", "Amharic", "Afaan Oromo", "Tigrigna"];

  return (
    <View className="h-full pt-6 px-8">
      <ScrollView className="space-y-4">
        {/* Delivery man language preference */}
        <View className="py-2">
          <Text className="text-center font-psemibold mb-4 text-lg ">
            Delivery Man Preference
          </Text>
          <View className="space-y-3">
            {languages.map((language) => (
              <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
                <View className="flex-1">
                  <Text className="text-gray-900 font-pmedium">{language}</Text>
                </View>
                {/* radio */}
                <RadioButton isActive={true} />
              </View>
            ))}
          </View>
        </View>

        {/* payment method */}
        <View className="py-2">
          <Text className="text-center font-psemibold mb-4 text-lg ">
            Payment Method
          </Text>
          <View className="space-y-3">
            <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
              <View className="flex-1 flex flex-row items-center space-x-2">
                <Image
                  source={require("../../assets/images/chapa.png")}
                  //className="w-16"
                  className="w-12 h-12"
                />
                <Text className="text-gray-900 font-pmedium">Chapa</Text>
              </View>
              {/* radio */}
              <RadioButton isActive={true} />
            </View>
            <View className="w-full items-center flex-row p-2 border border-gray-400 rounded-lg">
              <View className="flex-1 flex flex-row items-center space-x-2">
                <Image
                  source={require("../../assets/images/cashpayment.png")}
                  //className="w-16"
                  className="w-12 h-12"
                />
                <Text className="text-gray-900 font-pmedium">
                  Cash on delivery
                </Text>
              </View>
              {/* radio */}
              <RadioButton isActive={true} />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Action */}
      <CustomButton
        title={"Continue"}
        containerStyles={"mt-4 rounded-full bg-blue-500"}
        textStyles={"text-white"}
        handlePress={() => {}}
        isLoading={false}
      />
      <StatusBar style="dark" />
    </View>
  );
}
