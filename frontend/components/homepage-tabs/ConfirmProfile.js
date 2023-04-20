import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const ConfirmProfile = ({ navigation, phoneNumber, route }) => {
  const { event } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const encodedNumber = encodeURIComponent(phoneNumber);

    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
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

  const handleSave = () => {
    navigation.navigate("EventJoined", { event });
  };

  const { fullName, jobTitle, company, location, skills } = user;

  const imageSources = {
    "Evan Cook":
      "https://media.licdn.com/dms/image/D4E03AQFrVHEmMGdYDA/profile-displayphoto-shrink_400_400/0/1677708963424?e=1687392000&v=beta&t=2NkdXfpKhYDJWgZYLGY1qH9mH-Z336dtOgoTNtAZLyQ",
    "Selwyn George":
      "https://media.licdn.com/dms/image/C4E03AQGN55JqRBnpiQ/profile-displayphoto-shrink_400_400/0/1661310548042?e=1687392000&v=beta&t=ogDrJEChV_oQ1Txmrkg_HNDl_qML35UlcvT6jC2h8Nw",
    "Amara Ouattara":
      "https://media.licdn.com/dms/image/D4E35AQG4OfpoQWpbBw/profile-framedphoto-shrink_400_400/0/1677620593280?e=1682316000&v=beta&t=SwDUnRuVUzcG47maHepUS-q00eQ6l8lxvmnR2RHaFcE",
    "Sandro Viva":
      "https://media.licdn.com/dms/image/D4E03AQHOg74dlKwdBA/profile-displayphoto-shrink_400_400/0/1676074443895?e=1687392000&v=beta&t=3a6yZHrTFdv1LbR9IBrAQ-tQoJORXI6JSIb-7_RF4nQ",
    "Charles Bodor":
      "https://media.licdn.com/dms/image/D4E03AQEau3XjbYBctw/profile-displayphoto-shrink_400_400/0/1670976715970?e=1687392000&v=beta&t=wusIise5TBXBlgbt2Ir425UwmTKwNU7B8V3EQs1j6Tg",
    "Luciano Galvani":
      "https://media.licdn.com/dms/image/C4D03AQGpqOQk6KiVxQ/profile-displayphoto-shrink_400_400/0/1643506199288?e=1687392000&v=beta&t=H-TXFP9HT0ds2tuHa0ZmFMnVZD3e2_fr7tzUMMAco18",
    "Jack Cooper":
      "https://media.licdn.com/dms/image/C4D03AQFUXZitqWurTQ/profile-displayphoto-shrink_400_400/0/1633208696304?e=1687392000&v=beta&t=bJPWptUbfCtpi8gdfwbzp7tc5nJEkpcCNsN6MuUNE1c",
    "Ryan Eddy":
      "https://media.licdn.com/dms/image/C5603AQG3icJzLrb6fQ/profile-displayphoto-shrink_400_400/0/1645066722941?e=1687392000&v=beta&t=5nuJuDR_uGfuITQL09r_n8JOWMz8Tk8YXDkWqSTKiSI",
    "James Dewar":
      "https://media.licdn.com/dms/image/C4D03AQGl7qxZdJYJ1A/profile-displayphoto-shrink_400_400/0/1617282503348?e=1687392000&v=beta&t=ZV1JTsl6MBHWaZ0j9HZADpSxGzJG-_bmmbIenZGIsU8",
  };

  const imageSource = { uri: imageSources[fullName] };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={imageSource} style={styles.profileImage} />
      <Text style={styles.title}>{fullName}</Text>
      <Text>
        Confirm that you would liek to use these elements of your account
      </Text>
      <Text style={styles.text}>Job Title: {jobTitle}</Text>
      <Text style={styles.text}>Company: {company}</Text>
      <Text style={styles.text}>Location: {location}</Text>
      <Text style={styles.subTitle}>Skills:</Text>
      <Text style={styles.skills}>{skills.join(", ")}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 120,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginRight: 15, // Add space between the image and text
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  skills: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  saveButton: {
    backgroundColor: "#FD5252",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
});

export default ConfirmProfile;
