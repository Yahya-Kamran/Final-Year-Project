import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageComponent from '../components/ImageComponent';
import HeadingComponent from '../components/HeadingComponent';
import ParagraphComponent from '../components/ParagraphComponent';

const colors = {
  primary: '#008080',
  white: '#FFFFFF',
};

const fonts = {
  SemiBold: 'Roboto-SemiBold',
};

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <ImageComponent source={require('../../assets/images/logo.png')} />
      <HeadingComponent title="Welcome to Khudsuno!" />
      <ParagraphComponent text="Isharon ki Zuban ab hui Asaan" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButtonWrapper}
          onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#8ACAA7',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    width: '80%',
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
    backgroundColor: '#426B1F',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});

export default SplashScreen;
