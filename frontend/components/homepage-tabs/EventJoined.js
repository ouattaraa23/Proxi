import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

const EventJoined = ({ navigation, phoneNumber, route }) => {
  const { event } = route.params;

  const imageWidth = Dimensions.get("window").width;
  const imageHeight = Dimensions.get("window").height / 3;
  const encodedNumber = encodeURIComponent(phoneNumber);

  const handleConfirm = async () => {
    try {
      // Delete the event from the registeredEvents list
      await axios.put(
        `http://10.110.153.30:5000/proxi-users/delete-registered-event/${encodedNumber}`,
        { eventId: event._id }
      );
  
      // Add the event to the pastEvents list
      await axios.put(
        `http://10.110.153.30:5000/proxi-users/add-past-event/${encodedNumber}`,
        { eventId: event._id }
      );
  
      // Navigate back to the EventList screen
      navigation.navigate("EventList");
    } catch (error) {
      console.error("Error updating event lists:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.zIndexWrapper}>
        <ImageBackground
          source={{ uri: event.imageSource }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
          resizeMode="cover"
          blurRadius={2}
        >
          <View style={styles.blackOverlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{event.name}</Text>
            <View style={styles.dateLocContainer}>
              <Icon name="calendar-today" size={14} color="white" />
              <Text style={styles.date}>{event.date}</Text>
              <Icon name="place" size={14} color="white" />
              <Text style={styles.location}>{event.location}</Text>
            </View>
          </View>
          </View>
        </ImageBackground>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={36} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.subTitle}>Welcome To The Event!!</Text>
        <Text style={styles.description}>Once you leave the event you cannot join back.</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Leave The Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  blackOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the last value (0.4) to control the darkness level
  },
  zIndexWrapper: {
    zIndex: 1,
  },
  image: {
    width: "100%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateLocContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 18,
    color: "white",
    paddingRight: 60,
    left: 5,
  },
  location: {
    fontSize: 18,
    color: "white",
    left: 5,
  },
  descriptionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  confirmButton: {
    width: '60%',
    backgroundColor: "#FD5252",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    top: 20,
    left: 20,
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default EventJoined;
