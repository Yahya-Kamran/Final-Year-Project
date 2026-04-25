import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BottomNavBar from '../components/BottomNavBar'; // Adjust the path as necessary
import ImageComponent from '../components/ImageComponent';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Stats</Text>
      <View style={styles.mainContent}>
        <ImageComponent source={require('../../assets/images/3.png')} />
        <Text>Navigate to desired Page</Text>
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // nav bar remain at the bottom
  },
  mainContent: {
    flex: 1, // Take the remaining space
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
  },
  heading: {
    fontFamily: 'Roboto',
    color: '#426B1F',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
});

export default HomeScreen;
