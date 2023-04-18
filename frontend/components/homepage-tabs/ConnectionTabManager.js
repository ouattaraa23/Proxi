import React, { useState } from "react";
import {
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ConnectionInfoScreen from "./ConnectionInfoScreen";
import ConnectionTab from "./ConnectionTab";

const ConnectionTabManager = ({ navigation, phoneNumber }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ConnectionList">
      <Stack.Screen
        name="ConnectionList"
        options={{ headerShown: false }}
      >
        {(props) => {
          return <ConnectionTab {...props} phoneNumber={phoneNumber} />;
        }}
      </Stack.Screen>
      <Stack.Screen
        name="ConnectionInfo"
        options={{ headerShown: false }}
      >
        {(props) => {
          return <ConnectionInfoScreen {...props} phoneNumber={phoneNumber} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  eventContainer: {
    position: "absolute",
    height: "auto",
    width: "100%", // Change to 100% to take up full width
    marginBottom: 50, // Add margin bottom for spacing
  },
  search: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
});

export default ConnectionTabManager;
