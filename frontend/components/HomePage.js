import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeTab from "./homepage-tabs/HomeTab";
import EventTab from "./homepage-tabs/EventTab";
import ConnectionTabManager from "./homepage-tabs/ConnectionTabManager";
import ProfileTab from "./homepage-tabs/ProfileTab";

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation, phoneNumber }) => {
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? Platform.OS === "ios"
                  ? "ios-home"
                  : "md-home"
                : Platform.OS === "ios"
                ? "ios-home-outline"
                : "md-home-outline";
            } else if (route.name === "Connections") {
              iconName = focused
                ? Platform.OS === "ios"
                  ? "ios-people"
                  : "md-people"
                : Platform.OS === "ios"
                ? "ios-people-outline"
                : "md-people-outline";
            } else if (route.name === "Events") {
              iconName = focused
                ? Platform.OS === "ios"
                  ? "ios-calendar"
                  : "md-calendar"
                : Platform.OS === "ios"
                ? "ios-calendar-outline"
                : "md-calendar-outline";
            } else if (route.name === "Profile") {
              iconName = focused
                ? Platform.OS === "ios"
                  ? "ios-person"
                  : "md-person"
                : Platform.OS === "ios"
                ? "ios-person-outline"
                : "md-person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: ({ focused, color }) => {
            let label;

            if (route.name === "Home") {
              label = "Home";
            } else if (route.name === "Connections") {
              label = "Connections";
            } else if (route.name === "Events") {
              label = "Events";
            } else if (route.name === "Profile") {
              label = "Profile";
            }

            return <Text style={{ color }}>{label}</Text>;
          },
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "#6A5ACD",
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {(props) => {
            return <HomeTab {...props} phoneNumber={phoneNumber} />;
          }}
        </Tab.Screen>
        <Tab.Screen name="Connections" options={{ headerShown: false }}>
          {(props) => {
            return <ConnectionTabManager {...props} phoneNumber={phoneNumber} />;
          }}
        </Tab.Screen>
        <Tab.Screen name="Events" options={{ headerShown: false }}>
          {(props) => {
            return <EventTab {...props} phoneNumber={phoneNumber} />;
          }}
        </Tab.Screen>
        <Tab.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => {
            return <ProfileTab {...props} phoneNumber={phoneNumber} />;
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 150,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  tabBarStyle: Platform.select({
    ios: {
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "white",
    },
    android: {
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "white",
    },
  }),
  tabBarLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomePage;
