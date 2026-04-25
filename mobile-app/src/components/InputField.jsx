import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

const InputField = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  inputFocused: {
    borderColor: '#426B1F',
    backgroundColor: '#D9D9D9',
  },
});

export default InputField;
