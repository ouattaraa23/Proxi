import React, { useState } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const Connect = ({ navigation, route }) => {
  const { phoneNumber } = route.params;

  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("No");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });

      if (result.type === "success") {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (email != "") {
      const data = {
        email: email,
      };

      // Send the data to your backend using axios
      try {
        const encodedNumber = encodeURIComponent(phoneNumber);

        const response = await axios.put(
          `http://10.110.153.30:5000/proxi-users/add-email/${encodedNumber}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the response from your backend
        if (response.status === 200) {
          navigation.navigate("HomePage");
          console.log("Email added to profile successfully");
        } else {
          console.log("Error saving email data");
        }
      } catch (error) {
        console.log("Error saving email data:", error);
      }
    }
  };

  const { height } = Dimensions.get("window");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { height }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Sharing Preferences</Text>
        <Text style={styles.subText}>
          Add any profiles you want to share with your
        </Text>
        <Text style={styles.subText}>your new connections</Text>

        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior="position"
          enabled
        >
          <Text style={styles.subTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@proxi.com"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.optionsContainer}>
            <Text style={styles.subTitle}>Share Phone #</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={() => handleOptionSelect("Yes")}>
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === "Yes" && styles.selectedOptionText,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect("No")}>
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === "No" && styles.selectedOptionText,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <Text
          style={[
            styles.subTitle,
            { top: 20, alignSelf: "flex-start", marginLeft: 42 },
          ]}
        >
          Productivity
        </Text>
        <View style={[styles.buttonContainer, { top: 15, padding: 15 }]}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkedInButton}>
            <Text style={styles.linkedInButtonText}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.githubButton}>
            <Text style={styles.githubButtonText}>Github</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropBoxButton}>
            <Text style={styles.dropBoxButtonText}>DropBox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediumButton}>
            <Text style={styles.mediumButtonText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>Add More</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.subTitle,
            { paddingTop: 10, alignSelf: "flex-start", marginLeft: 42 },
          ]}
        >
          Socials
        </Text>
        <View style={[styles.buttonContainer, { padding: 15 }]}>
          <TouchableOpacity
            style={styles.facebookButton}
            onPress={handleUpload}
          >
            <Text style={styles.facebookButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.instagramButton}>
            <Text style={styles.instagramButtonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tiktokButton}>
            <Text style={styles.tiktokButtonText}>TikTok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.youtubeButton}>
            <Text style={styles.youtubeButtonText}>YouTube</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.twitterButton}>
            <Text style={styles.twitterButtonText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>Add More</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 150,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  subText: {
    bottom: 25,
    alignSelf: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    textAlign: "right",
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
    fontSize: 22,
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  formContainer: {
    width: "80%",
    position: "relative",
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
  buttonContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  uploadButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  saveButton: {
    top: 20,
    position: "relative",
    backgroundColor: "#FD5252",
    bottom: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "60%",
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

  uploadButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  linkedInButton: {
    backgroundColor: "#0077b5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkedInButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  githubButton: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  githubButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  dropBoxButton: {
    backgroundColor: "#3d9ae8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropBoxButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  mediumButton: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  mediumButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  moreButton: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  moreButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },

  facebookButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  facebookButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  instagramButton: {
    backgroundColor: "#d62976",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  instagramButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  tiktokButton: {
    backgroundColor: "#e6e1e3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tiktokButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  youtubeButton: {
    backgroundColor: "#ff0000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  youtubeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  twitterButton: {
    backgroundColor: "#1DA1F2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  twitterButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Connect;
