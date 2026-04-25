import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getUserData = async () => {
  const user = auth().currentUser;
  if (user) {
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      return userDoc.data(); // Returns user data (name, phone, etc.)
    } else {
      throw new Error('No user data found.');
    }
  } else {
    throw new Error('No user logged in.');
  }
};

const Signup = async (fullname, email, password, phone) => {
  if (!fullname.trim() || !password.trim() || !email.trim() || !phone.trim()) {
    throw new Error('Please fill in all fields.');
  }

  try {
    const cred = await auth().createUserWithEmailAndPassword(
      email.trim(),
      password,
    );
    const {uid} = cred.user;

    // Update user profile
    await auth().currentUser.updateProfile({displayName: fullname});

    // Save additional user data in Firestore
    await firestore().collection('users').doc(uid).set({
      phoneNumber: phone,
      email: email.trim(),
      displayName: fullname,
    });

    return uid;
  } catch (error) {
    throw new Error(error.message || 'Signup failed. Please try again.');
  }
};

const Login = async (email, password) => {
  if (!email.trim() || !password.trim()) {
    throw new Error('Please enter email and password.');
  }

  try {
    await auth().signInWithEmailAndPassword(email.trim(), password);
    return auth().currentUser.uid;
  } catch (error) {
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};

const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw new Error('Sign out failed. Please try again.');
  }
};

const Auth = {
  Signup,
  Login,
  signOut,
  getUserData,
};

export default Auth;
