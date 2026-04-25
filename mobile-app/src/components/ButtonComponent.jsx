import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#426B1F',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default ButtonComponent;
