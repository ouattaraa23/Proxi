import React, { useState, useEffect } from "react";
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
import ConnectionCard from "../tab-components/ConnectionCard";
import axios from "axios";

const PastEventInfoScreen = ({ navigation, route, phoneNumber }) => {
  const { event } = route.params;

  const imageWidth = Dimensions.get("window").width;
  const imageHeight = Dimensions.get("window").height / 3;

  const [user, setUser] = useState({});

  const [connectionsDetails, setConnectionsDetails] = useState([]);

  useEffect(() => {
    const encodedNumber = encodeURIComponent(phoneNumber);

    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
        const randomConnections = getRandomConnections(response.data.connections, 3);
        fetchConnectionsDetails(randomConnections);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [phoneNumber]);

  const getRandomConnections = (connectionsArray, numberOfConnections) => {
    const shuffled = connectionsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfConnections);
  };

  const fetchConnectionsDetails = async (connectionsArray) => {
    const fetchedDetails = await Promise.all(
      connectionsArray.map(async (connectionId) => {
        const response = await axios.get(
          `http://10.110.153.30:5000/proxi-users/user/${connectionId}`
        );
        return response.data;
      })
    );
    setConnectionsDetails(fetchedDetails);
  };

  const handleConnectCardPress = (connection) => () => {
    console.log("Connection Pressed");
    navigation.navigate("ConnectionInfo", { connection });
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
        <Text style={[styles.subTitle, {paddingBottom: 10 }]}>Interactions</Text>
        <View style={styles.connectionsContainer}>
        {connectionsDetails.map((connection, index) => (
          <ConnectionCard
            key={index + 1}
            name={connection.fullName}
            position={connection.jobTitle}
            imageName={connection.fullName}
            onPress={handleConnectCardPress(connection)}
            style={ {paddingBottom: 20} }
          />
        ))}
        </View>
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the last value (0.4) to control the darkness level
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "60%",
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

export default PastEventInfoScreen;
