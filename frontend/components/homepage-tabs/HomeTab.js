import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EventList from "./EventList";
import EventInfoScreen from "./EventInfoScreen";
import ConfirmProfile from "./ConfirmProfile";
import EventJoined from "./EventJoined";

const HomeTab = ({ navigation, phoneNumber }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="EventList">
      <Stack.Screen name="EventList" options={{ headerShown: false }}>
        {(props) => <EventList {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="EventInfo" options={{ headerShown: false }}>
        {(props) => <EventInfoScreen {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="ConfirmProfile" options={{ headerShown: false }}>
        {(props) => <ConfirmProfile {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="EventJoined" options={{ headerShown: false }}>
        {(props) => <EventJoined {...props} phoneNumber={phoneNumber} />}
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

export default HomeTab;
