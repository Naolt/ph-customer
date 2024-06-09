import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormField from "@/components/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CustomButton";
import { Button } from "react-native-paper";
import api from "@/api";
import { useSnackbar } from "@/providers/SnackBarProvider";
import { UserContext } from "@/providers/AuthProvider";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useSnackbar();

  useEffect(() => {
    // fetch user data
    api
      .get(`https://back-end-pharma-hub.onrender.com/user/id/${user.user_id}`)
      .then((res) => {
        setEmail(res.data.data.email);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [email]);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);

    setSubmitting(true);

    const body = {
      id: user.user_id,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    console.log("Body:", body);
    // Handle form submission
    api
      .post(
        `https://back-end-pharma-hub.onrender.com/auth/changePasswordById`,
        body
      )
      .then((res) => {
        console.log("Response:", res.data);
        toast("Changed password successfully", "success");
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response.data.message, null, 2));
        toast(
          err?.response?.data?.message || "Failed to change password",
          "error"
        );
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
              title="Old password"
              placeholder="Enter your old password"
              handleChangeText={handleChange("oldPassword")}
              onBlur={handleBlur("oldPassword")}
              value={values.oldPassword}
              otherStyles="mt-5"
              type="password"
              message={
                touched.oldPassword && errors.oldPassword
                  ? (errors.oldPassword as string)
                  : ""
              }
            />

            <FormField
              title="New password"
              placeholder="Enter your new password"
              handleChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
              otherStyles="mt-5"
              type="password"
              message={
                touched.newPassword && errors.newPassword
                  ? (errors.newPassword as string)
                  : ""
              }
            />

            <FormField
              title="Confirm password"
              placeholder="Confirm your new password"
              handleChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              otherStyles="mt-5"
              type="password"
              message={
                touched.confirmPassword && errors.confirmPassword
                  ? (errors.confirmPassword as string)
                  : ""
              }
            />

            <Button
              mode="contained"
              className="py-2 mt-8"
              disabled={submitting}
              onPress={() => {
                console.log(errors);
                if (Object.keys(errors).length > 0) {
                  return;
                }
                handleSubmit();
              }}
              type="submit"
            >
              Change Password
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
