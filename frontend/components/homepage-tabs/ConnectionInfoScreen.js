import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CoolButton from "./tab-components/CoolButton";

const ConnectionInfoScreen = ({ navigation, route }) => {
  const { connection } = route.params;

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

  const imageSource = { uri: imageSources[connection.fullName] };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image source={imageSource} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{connection.fullName}</Text>
          <Text style={styles.jobTitle}>{connection.jobTitle}</Text>
          <Text style={styles.company}>{connection.company}</Text>
        </View>
      </View>

      <View style={styles.skillsContainer}>
        {connection.skills.map((skill, index) => (
          <CoolButton key={index + 1} text={skill} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 120,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 15,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
  },
  skillsContainer: {
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 5,
    padding: 15,
    zIndex: 1,
  },
});

export default ConnectionInfoScreen;
