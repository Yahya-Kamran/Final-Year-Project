import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import BottomNavBar from '../components/BottomNavBar';

const CaptureScreen = () => {
  const handleUploadClick = () => {
    // Function to start a video or upload a video
    console.log('Upload clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.videoContainer}>
          <TouchableOpacity onPress={handleUploadClick}>
            <Image
              source={require('../../assets/images/upload.png')}
              style={styles.uploadImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // nav bar remain at the bottom
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: 400, // Adjust width as needed
    height: 600, // Adjust height as needed
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: 150, // Adjust the width of the image
    height: 150, // Adjust the height of the image
  },
});
