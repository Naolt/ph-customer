import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { set } from "react-hook-form";

const EmailVerification = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { id } = useLocalSearchParams();

  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Verification code is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);

    setLoading(true);

    const data = {
      user_id: id,
      verification_code: values.code,
    };
    // Handle form submission
    axios
      .post("https://back-end-pharma-hub.onrender.com/auth/verifyCode", data, {
        timeout: 10000,
      })
      .then((response) => {
        console.log("Response Data:", response?.data?.msg);
        setLoading(false);
        router.push("login");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error:", error?.response.data);
        setError(error?.response?.data?.msg || "An error occurred");
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
              title="Verfiication Code"
              placeholder="Enter your verification code"
              handleChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              value={values.code}
              otherStyles="mt-10"
              message={
                touched.code && errors.code ? (errors.code as string) : ""
              }
            />

            {error ? (
              <Text className="text-red-500 text-sm mt-2">{error}</Text>
            ) : null}

            <CustomButton
              title="Verify Code"
              handlePress={() => {
                console.log(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }
                handleSubmit(values);
              }}
              containerStyles="w-full bg-blue-500 mt-10"
              textStyles="text-white"
              isLoading={loading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EmailVerification;
