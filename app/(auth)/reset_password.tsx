import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";

const ResetPassword = () => {
  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Verification code is required"),
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
              title="Verfiication Code"
              placeholder="Enter your verification code"
              handleChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              value={values.code}
              otherStyles="mt-10"
            />
            {touched.code && errors.code && (
              <Text className="text-red-500 text-sm">{errors?.code}</Text>
            )}
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
              isLoading={false}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
