import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";

const DatePickerComponent = ({ date, setDate, containerStyles = "" }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View className={containerStyles}>
      <Text className="text-base text-gray-600 font-pmedium mb-2">
        {"Date of birth"}
      </Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="w-full h-14 px-4 bg-black-100 rounded border-2 border-gray-200 flex flex-row items-center"
      >
        <TextInput
          style={{ flex: 1 }}
          value={date ? format(date, "MM/dd/yyyy") : "Select Date"}
          editable={false}
          className=" text-gray-600"
        />
        <FontAwesome name="calendar" size={24} color="black" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
