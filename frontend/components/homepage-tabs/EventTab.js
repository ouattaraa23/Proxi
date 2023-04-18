import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PastEventInfoScreen from "./unregistered-events/PastEventInfoScreen";
import PastEventList from "./unregistered-events/PastEventList";
import ConfirmProfile from "./ConfirmProfile";
import ConnectionInfoScreen from "./ConnectionInfoScreen";

const EventTab = ({ navigation, phoneNumber }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="EventList">
      <Stack.Screen name="EventList" options={{ headerShown: false }}>
        {(props) => <PastEventList {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="EventInfo" options={{ headerShown: false }}>
        {(props) => <PastEventInfoScreen {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="ConfirmProfile" options={{ headerShown: false }}>
        {(props) => <ConfirmProfile {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
      <Stack.Screen name="ConnectionInfo" options={{ headerShown: false }}>
        {(props) => <ConnectionInfoScreen {...props} phoneNumber={phoneNumber} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default EventTab;
