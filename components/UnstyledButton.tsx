import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const UnstyledButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled = false,
}: {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex-row justify-center items-center ${containerStyles} ${
        isLoading || disabled ? "opacity-50" : ""
      }`}
      disabled={isLoading || disabled}
    >
      <Text className={`${textStyles}`}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default UnstyledButton;
