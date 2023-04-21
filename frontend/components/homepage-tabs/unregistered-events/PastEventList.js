import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import EventCard from "../tab-components/EventCard";

const PastEventList = ({ navigation, phoneNumber }) => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  const encodedNumber = encodeURIComponent(phoneNumber);

  useEffect(() => {
    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
        fetchRegisteredEventDetails(response.data.pastEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [phoneNumber]);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          `http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`
        )
        .then((response) => {
          setUser(response.data);
          fetchRegisteredEventDetails(response.data.pastEvents);
        })
        .catch((error) => {
          console.error(error);
        });
      return () => {}; // You can return a cleanup function if needed
    }, [])
  );

  if (!user) {
    return (
      <View style={[styles.container]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const fetchRegisteredEventDetails = async (eventArray) => {
    const fetchedDetails = await Promise.all(
      eventArray.map(async (eventId) => {
        const response = await axios.get(
          `http://10.110.153.30:5000/events/event/${eventId}`
        );
        return response.data;
      })
    );
    setEvents(fetchedDetails);
  };

  const handleCardPress = (event) => {
    navigation.navigate("EventInfo", { event });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        <Text style={[styles.subTitle, { paddingTop: 20, paddingBottom: 15, top: 35 }]}>
          Past Events
        </Text>
        <ScrollView
          style={[styles.eventContainer, { top: 30 }, { height: "100%" }]}
          showsHorizontalScrollIndicator={false}
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              imageSource={event.imageSource}
              title={event.name}
              date={event.date}
              location={event.location}
              onPress={() => handleCardPress(event)}
            />
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    position: "relative",
    width: "80%",
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
  confirmButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    bottom: 20,
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    top: 250,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: 200,
    textAlign: "center",
  },
});

export default PastEventList;
