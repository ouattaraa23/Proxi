import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EventCard = ({ imageSource, title, date, location, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateLocationContainer}>
          <View style={styles.dateContainer}>
            <Icon name="calendar-today" size={14} color="#757575" />
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Icon name="place" size={14} color="#757575" />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  dateLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#757575',
  },
  location: {
    fontSize: 14,
    color: '#757575',
  },
});

export default EventCard;
