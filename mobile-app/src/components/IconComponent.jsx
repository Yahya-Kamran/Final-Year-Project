import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
const IconComponent = ({iconSource, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Image source={iconSource} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center', // Center horizontally
    with: '100%',
  },
  icon: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
});

export default IconComponent;
