import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ConnectionCard = ({ name, position, imageName, onPress }) => {
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

  const imageSource = { uri: imageSources[imageName] };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.positionText}>{position}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    width: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15, // Add space between the image and text
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  positionText: {
    fontSize: 14,
    color: "#6A5ACD",
  },
});

export default ConnectionCard;
