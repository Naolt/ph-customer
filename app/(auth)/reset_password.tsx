import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { useRoute } from "@react-navigation/native";
import api from "@/api";
import { Button } from "react-native-paper";
import { useSnackbar } from "@/providers/SnackBarProvider";
import { router } from "expo-router";

const ResetPassword = () => {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const [loading, setLoading] = React.useState(false);

  const toast = useSnackbar();

  const initialValues = {
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string().required("Verification code is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setLoading(true);

    api
      .post("https://back-end-pharma-hub.onrender.com/auth/resetPassword", {
        email,
        verificationCode: values.verificationCode,
        newPassword: values.newPassword,
      })
      .then((response) => {
        console.log("Response Data:", response?.data?.msg);
        toast("Password reset successfully", "success");
        setLoading(false);
        router.replace("login");
      })
      .catch((error) => {
        console.log("Error:", JSON.stringify(error.response, null, 2));
        toast(
          error?.response?.data.message || "Error resetting password",
          "error"
        );
        setLoading(false);
      });
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
            <Text className="text-base text-gray-600 mt-2">
              Enter the verification code sent to your email and set a new
              password
            </Text>
            <FormField
              title="Verification Code"
              placeholder="Enter your verification code"
              handleChangeText={handleChange("verificationCode")}
              onBlur={handleBlur("verificationCode")}
              value={values.verificationCode}
              otherStyles="mt-10"
              message={
                touched.verificationCode && errors.verificationCode
                  ? (errors.verificationCode as string)
                  : ""
              }
            />
            <FormField
              title="New Password"
              placeholder="Enter your new password"
              handleChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
              type="password"
              otherStyles="mt-5"
              message={
                touched.newPassword && errors.newPassword
                  ? (errors.newPassword as string)
                  : ""
              }
            />

            <FormField
              title="Confirm Password"
              placeholder="Confirm your new password"
              handleChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              type="password"
              otherStyles="mt-5"
              message={
                touched.confirmPassword && errors.confirmPassword
                  ? (errors.confirmPassword as string)
                  : ""
              }
            />

            <Button
              mode="contained"
              className="py-2 mt-8"
              onPress={() => {
                handleSubmit(values);
              }}
              loading={loading}
            >
              Reset Password
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
