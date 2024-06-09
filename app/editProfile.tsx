import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { UserContext } from "@/providers/AuthProvider";
import api from "@/api";
import { Button } from "react-native-paper";
import { useSnackbar } from "@/providers/SnackBarProvider";
import DatePicker from "react-native-date-picker";
import DatePickerComponent from "@/components/UI/DatePickerComponent";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    national_id: "",
    date_of_birth: new Date(),
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(UserContext);
  const toast = useSnackbar();

  useEffect(() => {
    // fetch user data
    api
      .get(`https://back-end-pharma-hub.onrender.com/user/id/${user.user_id}`)
      .then((res) => {
        //console.log("User Data:", JSON.stringify(res.data, null, 2));
        setUserData({
          full_name: res.data.data.full_name,
          email: res.data.data.email,
          phone_number: res.data.data.phone_number,
          national_id: res.data.data.national_id,
          date_of_birth: new Date(res.data.data.date_of_birth),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user.user_id]);

  const initialValues = {
    full_name: userData.full_name || "",
    email: userData.email || "",
    phone_number: userData.phone_number || "",
    national_id: userData.national_id || "",
    date_of_birth: userData.date_of_birth || new Date(),
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    national_id: Yup.string(),
    date_of_birth: Yup.date(),
  });

  const handleSubmit = (values) => {
    setSubmitting(true);
    const body = {
      user_id: user.user_id,
      full_name: values.full_name,
      phone_number: values.phone_number,
      national_id: values.national_id,
      date_of_birth: values.date_of_birth?.toISOString(),
    };

    console.log("Body:", body);
    // Handle form submission
    api
      .put(
        `https://back-end-pharma-hub.onrender.com/user/id/${user.user_id}`,
        body
      )
      .then((res) => {
        console.log("Response:", JSON.stringify(res.data, null, 2));
        toast("Profile updated successfully", "success");
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        toast("An error occurred", "error");
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <View className="pt-4 px-4 h-full w-full items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="pt-4 px-4">
      <Formik
        enableReinitialize
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
          setFieldValue,
        }) => (
          <ScrollView>
            {/* Form Fields */}
            <FormField
              title="Email"
              keyboardType="email-address"
              placeholder="Enter your email"
              handleChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              otherStyles="mt-5"
              disabled={true}
              message={
                touched.email && errors.email ? (errors.email as string) : ""
              }
            />

            <FormField
              title="Phone Number"
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              handleChangeText={handleChange("phone_number")}
              onBlur={handleBlur("phone_number")}
              value={values.phone_number}
              otherStyles="mt-5"
              message={
                touched.phone_number && errors.phone_number
                  ? (errors.phone_number as string)
                  : ""
              }
              disabled={true}
            />

            <FormField
              title="Full Name"
              keyboardType="default"
              placeholder="Enter your full name"
              handleChangeText={handleChange("full_name")}
              onBlur={handleBlur("full_name")}
              value={values.full_name}
              otherStyles="mt-5"
              message={
                touched.full_name && errors.full_name
                  ? (errors.full_name as string)
                  : ""
              }
            />

            <FormField
              title="National ID"
              keyboardType="default"
              placeholder="Enter your national ID"
              handleChangeText={handleChange("national_id")}
              onBlur={handleBlur("national_id")}
              value={values.national_id}
              otherStyles="mt-5"
              message={
                touched.national_id && errors.national_id
                  ? (errors.national_id as string)
                  : ""
              }
            />

            <DatePickerComponent
              containerStyles="mt-5"
              date={values.date_of_birth}
              setDate={(date) => setFieldValue("date_of_birth", date)}
            />
            {touched.date_of_birth && errors.date_of_birth && (
              <Text className="text-red-500 text-sm">
                {errors.date_of_birth}
              </Text>
            )}

            <Button
              onPress={() => {
                console.log(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }
                handleSubmit(values);
              }}
              className="mt-10 py-2"
              mode="contained"
              loading={submitting}
            >
              Save Changes
            </Button>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;
