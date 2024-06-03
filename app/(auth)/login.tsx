import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "@/providers/AuthProvider";

const login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { saveUser } = React.useContext(UserContext);

  const initialValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    identifier: Yup.string().required("Phone Number or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setLoading(true);

    axios
      .post("https://back-end-pharma-hub.onrender.com/auth/", values)
      .then(async (response) => {
        console.log("Response Data:", response.data);
        saveUser(response.data);
        setLoading(false);
        router.push("home");
      })
      .catch((error) => {
        console.log("Error:", error?.response.data?.errors[0].msg);
        setError(
          error?.response.data?.errors[0]?.msg || "Something went wrong"
        );
        setLoading(false);
      });
  };

  return (
    <View className="h-full w-full">
      <ScrollView className="h-full px-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-full">
              <View className="w-full items-center justify-center">
                <Image
                  source={require("../../assets/images/welcome.png")}
                  className="w-48 h-48 rounded-2xl object-contain"
                />
              </View>
              <Text className="text-xl font-psemibold text-gray-800">
                Login to your account
              </Text>

              <FormField
                title={"Phone Number / Email"}
                placeholder={"Enter your phone number or email"}
                otherStyles={"mt-10"}
                handleChangeText={handleChange("identifier")}
                onBlur={handleBlur("identifier")}
                value={values.identifier}
                type={"phone-pad"} // Pass type prop to FormField for specific handling (optional)
              />
              {touched.identifier && errors.identifier && (
                <Text className="text-red-500 text-sm">
                  {errors.identifier}
                </Text>
              )}
              <FormField
                title={"Password"}
                placeholder={"Enter your password"}
                otherStyles={"mt-4"}
                type={"password"}
                handleChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text className="text-red-500 text-sm">{errors.password}</Text>
              )}

              {/* forget password link */}

              <Text
                className="text-blue-500 mt-2 w-full"
                onPress={() => router.push("forgot_password")}
              >
                Forgot Password?
              </Text>

              <View className="mt-10">
                {error && (
                  <View className="w-full py-2 px-2 rounded-xl bg-red-100">
                    <Text className="text-red-500 text-sm">{error}</Text>
                  </View>
                )}

                <CustomButton
                  title="Login"
                  handlePress={() => {
                    console.log(errors);
                    if (Object.keys(errors).length > 0) {
                      return;
                    }
                    handleSubmit(values);
                  }}
                  containerStyles="w-full bg-blue-500 mt-4"
                  textStyles="text-white"
                  isLoading={loading}
                />
                {/* link to register page */}

                <Text className="text-center mt-2">
                  Don't have an account?{" "}
                  <Text
                    className="text-blue-500"
                    onPress={() => router.replace("register")}
                  >
                    Register
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default login;
