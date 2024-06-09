import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "@/api";
import { useSnackbar } from "@/providers/SnackBarProvider";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const toast = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setLoading(true);

    api
      .post(
        "https://back-end-pharma-hub.onrender.com/auth/forgotPassword",
        values
      )
      .then((response) => {
        setLoading(false);
        console.log("Response Data:", response?.data?.msg);

        toast("Email sent successfully", "success");
        navigation.navigate("reset_password", { email: values.email });
      })
      .catch((error) => {
        setLoading(false);
        toast(error?.response?.data?.message || "Error sending email", "error");
        console.log("Error:", error);
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
            <FormField
              title="Email"
              placeholder="Enter your email"
              handleChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              otherStyles="mt-5"
              message={
                touched.email && errors.email ? (errors.email as string) : ""
              }
            />

            <Button
              onPress={() => handleSubmit(values)}
              mode="contained"
              className="py-2 mt-8"
              loading={loading}
            >
              Send Email
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
