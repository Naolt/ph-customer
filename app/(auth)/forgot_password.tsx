import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Full Name is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    // if it has error, return
    // Handle form submission
  };

  return (
    <View className="pt-4 px-4">
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
              title="Email"
              placeholder="Enter your email"
              handleChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              otherStyles="mt-10"
            />
            {touched.email && errors.email && (
              <Text className="text-red-500 text-sm">{errors?.email}</Text>
            )}
            <CustomButton
              title="Send Email"
              handlePress={() => {
                router.push("reset_password");
              }}
              containerStyles="w-full bg-blue-500 mt-10"
              textStyles="text-white"
              isLoading={false}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
