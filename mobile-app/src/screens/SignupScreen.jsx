import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import ImageComponent from '../components/ImageComponent';
import HeadingComponent from '../components/HeadingComponent';
import ButtonComponent from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import IconComponent from '../components/IconComponent';
import Auth from '../services/auth';

const SignupScreen = ({onSignupPress}) => {
  const navigation = useNavigation();

  // State variables for user input
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Handle signup functionality
  const handleSignup = async () => {
    try {
      const uid = await Auth.Signup(fullname, email, password, phone);
      console.log('User created with UID:', uid);
      Alert.alert('Success', 'Account created successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Home')},
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Signup failed. Please try again.');
    }
  };

  // Handle login navigation
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <ImageComponent source={require('../../assets/images/2.png')} />
      <HeadingComponent title="Create your account!" />

      {/* Fullname Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={fullname}
        onChangeText={setFullname}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Phone Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Signup Button */}
      <ButtonComponent
        title="Sign Up"
        onPress={handleSignup}
        disabled={!fullname || !email || !password || !phone}
      />

      {/* Or Continue With */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Google Login */}
      <IconComponent
        iconSource={require('../../assets/images/google.png')}
        onPress={handleLogin}
      />

      {/* Redirect to Login */}
      <Text style={styles.signInText}>
        Already have an account?
        <Text style={styles.signInLink} onPress={handleLogin}>
          {' '}
          Login{' '}
        </Text>
      </Text>
    </ScrollView>
  );
};

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
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#888',
  },
  signInText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  signInLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SignupScreen;

