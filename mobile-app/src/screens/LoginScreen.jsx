// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import ImageComponent from '../components/ImageComponent';
// import HeadingComponent from '../components/HeadingComponent';
// import InputField from '../components/InputField';
// import ButtonComponent from '../components/ButtonComponent';
// import {useNavigation} from '@react-navigation/native';
// import IconComponent from '../components/IconComponent';

// const LoginScreen = () => {
//   const navigation = useNavigation();

//   const handleLogin = () => {
//     navigation.navigate('Home');
//   };
//   const handleSignup = () => {
//     navigation.navigate('Signup');
//   };

//   return (
//     <View style={styles.container}>
//       <ImageComponent source={require('../../assets/images/3.png')} />
//       <HeadingComponent title={'Welcome back!'} />
//       <InputField placeholder="username" />
//       <InputField placeholder={'Password'} secureTextEntry />
//       <ButtonComponent title={'Login Now'} onPress={handleLogin} />
//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.orText}>Or Continue with</Text>
//         <View style={styles.line} />
//       </View>
//       <IconComponent
//         iconSource={require('../../assets/images/google.png')}
//         onPress={handleLogin}
//       />

//       <Text style={styles.signInText}>
//         Don't have an account?
//         <Text style={styles.signInLink} onPress={handleSignup}>
//           {' '}
//           Signup{' '}
//         </Text>
//       </Text>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//     width: '100%',
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: '#888',
//     fontSize: 16,
//     alignContent: 'center',
//   },
//   signInText: {
//     fontSize: 17,
//     textAlign: 'center',
//     color: 'black',
//   },
//   signInLink: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
// });

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import ImageComponent from '../components/ImageComponent';
import HeadingComponent from '../components/HeadingComponent';
import ButtonComponent from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import IconComponent from '../components/IconComponent';
import Auth from '../services/auth'; // Assuming this handles authentication

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const uid = await Auth.Login(email, password); // Assuming this checks user credentials
      if (uid) {
        Alert.alert('Success', 'You are logged in successfully!', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <ImageComponent source={require('../../assets/images/3.png')} />
      <HeadingComponent title={'Welcome back!'} />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* Login Button */}
      <ButtonComponent
        title={'Login Now'}
        onPress={handleLogin}
        disabled={!email || !password}
      />

      {/* OR Separator */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Google Icon */}
      <IconComponent
        iconSource={require('../../assets/images/google.png')}
        onPress={() =>
          Alert.alert('Google Login', 'Google Login is not yet implemented')
        }
      />

      {/* Signup Text */}
      <Text style={styles.signInText}>
        Don't have an account?
        <Text style={styles.signInLink} onPress={handleSignup}>
          {' '}
          Signup{' '}
        </Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
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
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 16,
    alignContent: 'center',
  },
  signInText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
  },
  signInLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
