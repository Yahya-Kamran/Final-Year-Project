import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import Auth from '../services/auth'; // Import Auth service
import BottomNavBar from '../components/BottomNavBar';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await Auth.getUserData();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      //Alert.alert('Logout', 'Logout successfully');
      navigation.navigate('Splash'); // Navigate to splash screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.title}>{userData.displayName}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.heading}>Email</Text>
        <View style={styles.contentBox}>
          <Text style={styles.text}>{userData.email}</Text>
        </View>

        <Text style={styles.heading}>Phone Number</Text>
        <View style={styles.contentBox}>
          <Text style={styles.text}>{userData.phoneNumber}</Text>
        </View>

        <View style={styles.feedback}>
          <Text style={styles.text}>FEEDBACK</Text>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60, // Pushes header down a bit to look nicer
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10, // Adjust margin as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the start for a more natural layout
    padding: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentBox: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    marginTop: 210,
    marginLeft: '80%',
    fontWeight: 'bold',
  },
  feedback: {
    width: '40%',
    padding: 15,
    marginTop: 50,
    backgroundColor: '#426B1F',
    borderRadius: 5,
  },
});

export default ProfileScreen;
