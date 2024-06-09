// components/Snackbar.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Snackbar = ({ message, type }) => {
  const [visible, setVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      setVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setVisible(false));
        }, 3000);
      });
    }
  }, [message, opacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.snackbar,
        { opacity, backgroundColor: type === "success" ? "green" : "red" },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default Snackbar;
