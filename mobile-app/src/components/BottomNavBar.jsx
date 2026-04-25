import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();

  const handleCapturePress = () => {
    navigation.navigate('Capture');
  };

  const handleAvatarPress = () => {
    navigation.navigate('Avatar');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePress} style={styles.navItem}>
        <Image
          source={require('../../assets/images/Home.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAvatarPress} style={styles.navItem}>
        <Image
          source={require('../../assets/images/signlanguage.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Avatar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCapturePress} style={styles.navItem}>
        <Image
          source={require('../../assets/images/Camera.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Capture</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfilePress} style={styles.navItem}>
        <Image
          source={require('../../assets/images/User.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#426B1F',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BottomNavBar;
