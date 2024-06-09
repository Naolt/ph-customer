import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  message = "",
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text
        className={`text-base ${
          disabled ? "text-gray-400" : "text-gray-600"
        } font-pmedium`}
      >
        {title}
      </Text>

      <View
        className={`w-full h-14 px-4 rounded border-2 flex flex-row items-center ${
          disabled
            ? "bg-gray-200 border-gray-300"
            : isFocused
            ? "border-secondary bg-black-100"
            : "border-gray-200 bg-black-100"
        }`}
      >
        <TextInput
          className={`flex-1 font-pregular text-base ${
            disabled ? "text-gray-400" : "text-gray-800"
          }`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={disabled ? "#C0C0C0" : "#7B7B8B"}
          onChangeText={handleChangeText}
          secureTextEntry={props?.type === "password" && !showPassword}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          {...props}
        />

        {/* Show password icon */}
        {props.type === "password" && !disabled ? (
          showPassword ? (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require("../assets/icons/eye.png")}
                style={{ width: 20, height: 20 }}
                className="cursor-pointer"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require("../assets/icons/eye-off.png")}
                style={{ width: 20, height: 20 }}
                className="cursor-pointer"
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>
      {message ? <Text className="text-red-500 text-sm">{message}</Text> : null}
    </View>
  );
};

export default FormField;
