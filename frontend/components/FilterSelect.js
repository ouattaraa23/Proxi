import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import SelectableButton from "./SelectableButton";
import ProgressBar from "./ProgressBar";

import axios from "axios";

const FilterSelect = ({ navigation, phoneNumber }) => {
  const [skillsList, setSkillsList] = useState([]);

  const handleToggleSkill = (skill, isSelected) => {
    if (isSelected) {
      console.log("Skill added", skill);
      setSkillsList([...skillsList, skill]);
    } else {
      setSkillsList(skillsList.filter((item) => item !== skill));
    }
  };

  const handleConfirm = () => {
    addSkills();
    navigation.navigate("Connect", { phoneNumber: phoneNumber });
  };

  const addSkills = async () => {
    const data = {
      skills: skillsList,
    };

    const encodedNumber = encodeURIComponent(phoneNumber);

    const response = await axios.put(
      `http://10.110.153.30:5000/proxi-users/add-skills/${encodedNumber}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <ProgressBar progress={85} />
      <Text style={[styles.title, { paddingBottom: 20 }]}>Select Filters</Text>
      <Text style={[styles.memo, { bottom: 45 }]}>
        Scroll to see more filters!
      </Text>

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <SelectableButton text="Intern" onToggle={handleToggleSkill} />
        <SelectableButton text="Software" onToggle={handleToggleSkill} />
        <SelectableButton text="Finance" onToggle={handleToggleSkill} />
        <SelectableButton text="Business" onToggle={handleToggleSkill} />
        <SelectableButton text="Northeastern University" onToggle={handleToggleSkill} />
        <SelectableButton text="Graphic Design" onToggle={handleToggleSkill} />
        <SelectableButton text="Web Dev" onToggle={handleToggleSkill} />
        <SelectableButton text="Excel" onToggle={handleToggleSkill} />
        <SelectableButton text="Investments" onToggle={handleToggleSkill} />
        <SelectableButton text="User Experience" onToggle={handleToggleSkill} />
        <SelectableButton text="Co-op" onToggle={handleToggleSkill} />
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
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
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  memo: {
    fontSize: 15,
  },
  confirmButton: {
    backgroundColor: "#FD5252",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  confirmText: {
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
});

export default FilterSelect;
