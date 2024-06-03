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
    email: "",
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
    email: Yup.string().required("Email is required").email("Email is invalid"),
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
      email: values.email,
      password: values.password,
      role_id: 2,
    };

    axios
      .post("https://back-end-pharma-hub.onrender.com/auth/user", data, {
        timeout: 10000,
      })
      .then((response) => {
        console.log("Response Data:", response?.data?.msg);
        const id = response.data.user.user_id;
        console.log("Registered User ID:", id);
        setLoading(false);
        router.push(`email_verification/${id}`);
      })
      .catch((error) => {
        console.log("Error:", error?.response?.data?.errors[0].msg);
        if (error.code === "ECONNABORTED") {
          setError("A timeout occured");
        } else {
          setError(
            error?.response.data?.errors[0].msg || "Something went wrong"
          );
        }
        setLoading(false);
      });
  };

  return (
    <ScrollView className="h-full pt-4 px-4">
      <View className="w-full h-full">
        <Text className="text-2xl font-psemibold text-gray-800">
          Create your account
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
            <View className="w-full">
              <FormField
                title="Full Name"
                placeholder="Enter your full name"
                handleChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                otherStyles="mt-8"
                message={
                  touched.fullName && errors.fullName
                    ? (errors.fullName as string)
                    : ""
                }
              />

              <FormField
                title="Phone Number"
                placeholder="Enter your phone number"
                handleChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                otherStyles="mt-4"
                type="phone-pad"
                message={
                  touched.phoneNumber && errors.phoneNumber
                    ? (errors.phoneNumber as string)
                    : ""
                }
              />

              <FormField
                title="Email"
                placeholder="Enter your email"
                handleChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                otherStyles="mt-4"
                message={
                  touched.email && errors.email ? (errors.email as string) : ""
                }
              />

              <FormField
                title="Password"
                placeholder="Enter your password"
                handleChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                otherStyles="mt-4"
                type="password"
                message={
                  touched.password && errors.password
                    ? (errors.password as string)
                    : ""
                }
              />

              <FormField
                title="Confirm Password"
                placeholder="Enter your password again"
                handleChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                otherStyles="mt-4"
                type="password"
                message={
                  touched.confirmPassword && errors.confirmPassword
                    ? (errors.confirmPassword as string)
                    : ""
                }
              />

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

              <View className="">
                {error && (
                  <View className="w-full py-2 px-2 rounded-xl bg-red-100 mt-4">
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
                  containerStyles="w-full bg-blue-500 mt-8"
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
  );
};

export default Register;
