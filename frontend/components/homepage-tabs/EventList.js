import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import SearchButtonGroup from "./tab-components/SearchButtonGroup";
import EventCard from "./tab-components/EventCard";

const EventList = ({ navigation, phoneNumber }) => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const encodedNumber = encodeURIComponent(phoneNumber);

    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
        fetchRegisteredEventDetails(response.data.registeredEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [phoneNumber]);

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
    navigation.navigate("EventInfo", {
      event,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        <TextInput
          style={[styles.search, { top: 38 }]}
          placeholder="Search"
          maxLength={50}
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <SearchButtonGroup />

        <ScrollView
          style={[styles.eventContainer, { top: 30 }, { height: "100%" }]}
          showsHorizontalScrollIndicator={false}
        >
          <Text
            style={[styles.subTitle, { paddingTop: 15, paddingBottom: 15 }]}
          >
            Registered Events
          </Text>

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

export default EventList;
