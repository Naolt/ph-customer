import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-gray-600 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded border-2 border-gray-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-pregular text-base"
          style={{ color: "gray" }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {/* Show password icon */}
        {props.type === "password" ? (
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
    </View>
  );
};

export default FormField;
