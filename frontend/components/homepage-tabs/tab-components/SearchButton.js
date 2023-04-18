import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchButton = ({ text, isSelected, onPress }) => {

  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderColor: '#6A5ACD',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: '#6A5ACD',
  },
  buttonText: {
    color: '#6A5ACD',
  },
  selectedText: {
    color: 'white',
  },
});

export default SearchButton;
