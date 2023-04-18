import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import LoginTab from "./components/LoginTab";
import CreateProfile from "./components/CreateProfile";
import HomePage from "./components/HomePage";
import Connect from "./components/Connect";
import FilterSelect from "./components/FilterSelect";

const Stack = createStackNavigator();

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (phoneNumber) => {
    console.log("PhoneNumber Changed:", phoneNumber);
    setPhoneNumber(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginTab {...props} handleLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="CreateProfile" options={{ headerShown: false }}>
            {(props) => <CreateProfile {...props} phoneNumber={phoneNumber} />}
          </Stack.Screen>
          <Stack.Screen name="HomePage" options={{ headerShown: false }}>
            {(props) => <HomePage {...props} phoneNumber={phoneNumber} />}
          </Stack.Screen>
          <Stack.Screen name="Connect" options={{ headerShown: false }}>
            {(props) => <Connect {...props} phoneNumber={phoneNumber} />}
          </Stack.Screen>
          <Stack.Screen name="FilterSelect" options={{ headerShown: false }}>
            {(props) => <FilterSelect {...props} phoneNumber={phoneNumber} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "#7069f5",
    justifyContent: "center",
  },
});
