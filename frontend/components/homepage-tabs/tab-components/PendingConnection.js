import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PendingConnection = ({ name, onAccept, onDeny, onPress }) => {
    return (
      <TouchableOpacity style={styles.pendingConnectionContainer} onPress={onPress}>
        <Text style={styles.pendingConnectionName}>{name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.denyButton} onPress={onDeny}>
            <Text style={styles.buttonText}>Deny</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    pendingConnectionContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#6A5ACD",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    pendingConnectionName: {
      color: "#FFFFFF",
      fontWeight: "bold",
      flex: 1, // Add this line to give the name more space
      marginRight: 10, // Add this line to add some space between the name and the buttons
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    acceptButton: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
      marginRight: 5,
    },
    denyButton: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: "#6A5ACD",
      fontWeight: "bold",
    },
  });

export default PendingConnection;