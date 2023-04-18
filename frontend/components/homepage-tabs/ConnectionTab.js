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
import PendingConnection from "./tab-components/PendingConnection";
import ConnectionCard from "./tab-components/ConnectionCard";

import axios from "axios";

const ConnectionTab = ({ navigation, phoneNumber }) => {
  const [user, setUser] = useState(null);
  const [pendingConnectionsDetails, setPendingConnectionsDetails] = useState([]);
  const [connectionsDetails, setConnectionsDetails] = useState([]);

  useEffect(() => {
    const encodedNumber = encodeURIComponent(phoneNumber);

    axios
      .get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then((response) => {
        setUser(response.data);
        fetchPendingConnectionsDetails(response.data.pendingConnections);
        fetchConnectionsDetails(response.data.connections);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [phoneNumber]);

  const fetchPendingConnectionsDetails = async (pendingConnectionsArray) => {
    const fetchedDetails = await Promise.all(
      pendingConnectionsArray.map(async (connectionId) => {
        const response = await axios.get(
          `http://10.110.153.30:5000/proxi-users/user/${connectionId}`
        );
        return response.data;
      })
    );
    setPendingConnectionsDetails(fetchedDetails);
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

  if (!user) {
    return (
      <View style={[styles.container]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const acceptConnection = async (connectionId) => {
    try {
      const encodedNumber = encodeURIComponent(phoneNumber);
      // Remove connection ID from pendingConnections and add it to connections
      await axios.put(
        `http://10.110.153.30:5000/proxi-users/delete-pending-connection/${encodedNumber}`,
        { connectionId }
      );
      await axios.put(
        `http://10.110.153.30:5000/proxi-users/add-connection/${encodedNumber}`,
        { connectionId }
      );

      // Update local state
      setPendingConnectionsDetails(
        pendingConnectionsDetails.filter(
          (connection) => connection._id !== connectionId
        )
      );

      const connectionDetails = await axios.get(
        `http://10.110.153.30:5000/proxi-users/user/${connectionId}`
      );

      setConnectionsDetails([...connectionsDetails, connectionDetails.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const denyConnection = async (connectionId) => {
    try {
      const encodedNumber = encodeURIComponent(phoneNumber);
      // Remove connection ID from pendingConnections
      await axios.put(
        `http://10.110.153.30:5000/proxi-users/delete-pending-connection/${encodedNumber}`,
        { connectionId }
      );

      // Update local state
      setPendingConnectionsDetails(
        pendingConnectionsDetails.filter(
          (connection) => connection._id !== connectionId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectCardPress = (connection) => () => {
    console.log("Connection Pressed");
    navigation.navigate("ConnectionInfo", { connection });
  };

  // const { pendingConnection, connections } = user;

  // Replace the dummy pending connection with actual data
  const { pendingConnections, connections } = user;
  console.log(pendingConnections);
  console.log(connections);

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Connections</Text>
      <ScrollView 
      contentContainerStyle={styles.connectionContainer}>
        {pendingConnectionsDetails.length > 0 && (
          <Text style={styles.subTitle}>Pending Connections</Text>
        )}
        {pendingConnectionsDetails.map((connection, index) => (
          <PendingConnection
            key={index + 1}
            name={connection.fullName}
            onAccept={() => {
              acceptConnection(connection._id);
              console.log(`Accepted connection with ${connection.fullName}`);
            }}
            onDeny={() => {
              denyConnection(connection._id);
              console.log(`Denied connection with ${connection.fullName}`);
            }}
            onPress={handleConnectCardPress(connection)}
          />
        ))}
        {connectionsDetails.length > 0 && (
          <Text style={styles.subTitle}>Your Connections</Text>
        )}
        {connectionsDetails.map((connection, index) => (
          <ConnectionCard
            key={index + 1}
            name={connection.fullName}
            position={connection.jobTitle}
            imageName={connection.fullName}
            onPress={handleConnectCardPress(connection)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 120,
    backgroundColor: "#FFFFFF",
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
    marginBottom: 10,
  },
  connectionContainer: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  pendingConnections: {
    backgroundColor: "#6A5ACD",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  yourConnections: {
    backgroundColor: "#6A5ACD",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  connectionsList: {
    color: "#6A5ACD",
    marginBottom: 10,
  },
});

export default ConnectionTab;
