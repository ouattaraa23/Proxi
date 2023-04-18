import React from "react";

import { View, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "85%",
    height: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    bottom: 15,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
  },
});

export default ProgressBar;
