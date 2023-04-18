import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SelectableButton = ({ text, onToggle }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onToggle(text, !isSelected);
  };

  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: '#6A5ACD',
  },
  buttonText: {
    color: 'white',
  },
});

export default SelectableButton;
