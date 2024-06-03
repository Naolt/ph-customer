import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";

const ChangePassword = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
              title="Old Password"
              placeholder="Enter your old password"
              handleChangeText={handleChange("oldPassword")}
              onBlur={handleBlur("oldPassword")}
              value={values.oldPassword}
              otherStyles="mt-10"
              secureTextEntry
            />
            {touched.oldPassword && errors.oldPassword && (
              <Text className="text-red-500 text-sm">{errors.oldPassword}</Text>
            )}

            <FormField
              title="New Password"
              placeholder="Enter your new password"
              handleChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
              otherStyles="mt-10"
              secureTextEntry
            />
            {touched.newPassword && errors.newPassword && (
              <Text className="text-red-500 text-sm">{errors.newPassword}</Text>
            )}

            <FormField
              title="Confirm Password"
              placeholder="Confirm your new password"
              handleChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              otherStyles="mt-10"
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text className="text-red-500 text-sm">
                {errors.confirmPassword}
              </Text>
            )}

            <CustomButton
              title="Save Changes"
              handlePress={() => {
                console.log(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }
                handleSubmit(values);
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

export default ChangePassword;
