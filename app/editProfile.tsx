import { View, Text } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";

const EditProfile = () => {
  const initialValues = {
    fullName: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
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
              title="Full Name"
              placeholder="Enter your full name"
              handleChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              otherStyles="mt-10"
            />
            {touched.fullName && errors.fullName && (
              <Text className="text-red-500 text-sm">{errors.fullName}</Text>
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

export default EditProfile;
