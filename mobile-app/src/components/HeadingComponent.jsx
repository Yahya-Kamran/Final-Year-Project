import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HeadingComponent = ({title}) => {
  return <Text style={styles.heading}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Roboto',
    color: '#426B1F',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
});

export default HeadingComponent;
