import React, { useState } from 'react';
import { View } from 'react-native';
import SearchButton from './SearchButton';

const SearchButtonGroup = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    if (selectedButtonIndex === buttonIndex) {
      setSelectedButtonIndex(null);
    } else {
      setSelectedButtonIndex(buttonIndex);
    }
  };

  return (
    <View style={{ flexDirection: 'row', top: 38 }}>
      <SearchButton
        text="Sports"
        isSelected={selectedButtonIndex === 0}
        onPress={() => handleButtonPress(0)}
      />
      <SearchButton
        text="Career"
        isSelected={selectedButtonIndex === 1}
        onPress={() => handleButtonPress(1)}
      />
      <SearchButton
        text="Food/Drinks"
        isSelected={selectedButtonIndex === 2}
        onPress={() => handleButtonPress(2)}
      />
      <SearchButton
        text="Club"
        isSelected={selectedButtonIndex === 3}
        onPress={() => handleButtonPress(3)}
      />
    </View>
  );
};

export default SearchButtonGroup;
