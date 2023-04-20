import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import SearchButtonGroup from "./tab-components/SearchButtonGroup";
import EventCard from "./tab-components/EventCard";
import { useFocusEffect } from "@react-navigation/native";

const EventList = ({ navigation, phoneNumber }) => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [eventsUpdated, setEventsUpdated] = useState(false);

  const [joinCode, setJoinCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const encodedNumber = encodeURIComponent(phoneNumber);

  useEffect(() => {
    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
        fetchRegisteredEventDetails(response.data.registeredEvents);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchAllEvents();
    // Reset eventsUpdated to false
    if (eventsUpdated) {
      setEventsUpdated(false);
    }
  }, [phoneNumber, eventsUpdated]);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          `http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`
        )
        .then((response) => {
          setUser(response.data);
          fetchRegisteredEventDetails(response.data.registeredEvents);
        })
        .catch((error) => {
          console.error(error);
        });
      fetchAllEvents();
      // Reset eventsUpdated to false
      if (eventsUpdated) {
        setEventsUpdated(false);
      }
    }, [])
  );

  if (!user) {
    return (
      <View style={[styles.container]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        "http://10.110.153.30:5000/events/all-events"
      );
      setAllEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleAddEvent = () => {
    setModalVisible(true);
  };

  const handleJoinCodeSubmit = async () => {
    setModalVisible(false);

    try {
      // Get the event with the matching join code
      const response = await axios.get(
        `http://10.110.153.30:5000/events/join-code/${joinCode}`
      );
      const event = response.data;

      if (!event) {
        // Handle event not found case
        return;
      }

      const encodedNumber = encodeURIComponent(phoneNumber);

      await axios.put(
        `http://10.110.153.30:5000/proxi-users/add-registered-event/${encodedNumber}/${event._id}`
      );

      // Set eventsUpdated to true to trigger useEffect
      setEventsUpdated(true);
      setJoinCode("");
    } catch (error) {
      console.error(error);
    }
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
        <TouchableOpacity
          style={[styles.confirmButton]}
          onPress={handleAddEvent}
        >
          <Text style={styles.confirmButtonText}>Add Event</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setJoinCode("");
          }}
        >
          <Pressable
            style={styles.modalBackground}
            onPress={() => {
              setModalVisible(false);
              setJoinCode("");
            }}
          >
            <View style={styles.modalCenteredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter Join Code:</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="Join Code"
                  keyboardType="numeric"
                  maxLength={6}
                  value={joinCode}
                  onChangeText={setJoinCode}
                />
                <Pressable
                  style={[styles.modalButton, styles.modalButtonClose]}
                  onPress={handleJoinCodeSubmit}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCenteredView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#FD5252",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 36,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default EventList;
