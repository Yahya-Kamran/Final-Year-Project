import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar';
import InputField from '../components/InputField'; // Import the InputField component

const AvatarScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.mainContent}>
        <Image
          source={require('../../assets/images/Avatar.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputField placeholder="Type something..." />
        <TouchableOpacity style={styles.voiceButton}>
          <Image
            source={require('../../assets/images/voice-icon.png')}
            style={styles.voiceIcon}
          />
        </TouchableOpacity>
      </View>
      <BottomNavBar />
    </KeyboardAvoidingView>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '90%',
    height: '90%',
  },
  inputContainer: {
    flexDirection: 'row', // Arrange input and icon in a row
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  voiceButton: {
    flexShrink: 0, // keep voice button size fixed
  },
  voiceIcon: {
    width: 25,
    height: 30,
  },
});
