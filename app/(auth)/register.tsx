import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string(),
    //.required("Full Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setLoading(true);

    const data = {
      phone_number: values.phoneNumber,
      password: values.password,
      role_id: 2,
    };

    axios
      .post("https://back-end-pharma-hub.onrender.com/auth/user", data)
      .then((response) => {
        console.log("Response Data:", response.data);
        setLoading(false);
        router.push("login");
      })
      .catch((error) => {
        console.log("Error:", error?.response.data?.errors[0].msg);
        setError(error?.response.data?.errors[0].msg || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full pt-4 px-4">
        <View className="w-full h-full">
          <Text className="text-2xl font-psemibold text-gray-800">
            Create your account {loading && "Loading..."}
          </Text>
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
              <View>
                <FormField
                  title="Full Name"
                  placeholder="Enter your full name"
                  handleChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  otherStyles="mt-10"
                />
                {touched.fullName && errors.fullName && (
                  <Text className="text-red-500 text-sm">
                    {errors.fullName}
                  </Text>
                )}
                <FormField
                  title="Phone Number"
                  placeholder="Enter your phone number"
                  handleChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  otherStyles="mt-10"
                  type="phone-pad"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text className="text-red-500 text-sm">
                    {errors.phoneNumber}
                  </Text>
                )}
                <FormField
                  title="Password"
                  placeholder="Enter your password"
                  handleChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  otherStyles="mt-10"
                  type="password"
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-sm">
                    {errors.password}
                  </Text>
                )}
                <FormField
                  title="Confirm Password"
                  placeholder="Enter your password again"
                  handleChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  otherStyles="mt-10"
                  type="password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </Text>
                )}

                {/* link to login page */}
                <Text>
                  Already have an account?{" "}
                  <Text
                    className="text-blue-500"
                    onPress={() => router.replace("login")}
                  >
                    Login
                  </Text>
                </Text>

                <View className="mt-10">
                  {error && (
                    <View className="w-full py-2 px-2 rounded-xl bg-red-100">
                      <Text className="text-red-500 text-sm">{error}</Text>
                    </View>
                  )}
                  <CustomButton
                    title="Register"
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
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View className="h-20"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
