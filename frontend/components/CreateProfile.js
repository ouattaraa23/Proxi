import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
// import { RNFetchBlob, RNFetchBlobConfig, RNFetchBlobNative } from 'rn-fetch-blob';

import KeyboardAvoidingWrapper from "./wrappers/KeyboardAvoidingWrapper";
import ProgressBar from "./ProgressBar";

const CreateProfile = ({ navigation, phoneNumber }) => {

  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setProfileImage(selectedAsset.uri);
    }
  };

  const handleSave = async () => {
    if (fullName != "" && position != "" && company != "" && location != "") {
      const data = {
        fullName: fullName,
        jobTitle: position,
        company: company,
        location: location,
      };
  
      // Send the data to your backend using axios
      try {

        const encodedNumber = encodeURIComponent(phoneNumber);

        const response = await axios.put(
          `http://10.110.153.30:5000/proxi-users/update/${encodedNumber}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // Handle the response from your backend
        if (response.status === 200) {
          navigation.navigate("FilterSelect");
          console.log("Profile data saved successfully");
        } else {
          console.log("Error saving profile data");
        }
      } catch (error) {
        console.log("Error saving profile data:", error);
      }
    }
  };

  const { height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ProgressBar progress={50} />

        <Text style={styles.title}>Create Profile</Text>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handlePickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={100}
                color="#6A5ACD"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Text style={styles.subTitle}>Job Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Job Title"
            value={position}
            onChangeText={setPosition}
          />
          <Text style={styles.subTitle}>Company</Text>
          <TextInput
            style={styles.input}
            placeholder="Company"
            value={company}
            onChangeText={setCompany}
          />
          <Text style={styles.subTitle}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 120,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 10,
  },
  profileImage: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "80%",
    position: "relative",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    width: "100%",
  },
  skillsContainer: {
    width: "80%",
  },
  saveButton: {
    backgroundColor: "#FD5252",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 5,
    padding: 15,
  },
  opaqueBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateProfile;
