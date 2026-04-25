import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ParagraphComponent = ({ text }) => {
  return <Text style={styles.paragraph}>{text}</Text>;
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default ParagraphComponent;
