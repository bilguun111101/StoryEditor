import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ModalText from './modal';

const TextStory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4D83FF', '#205EED', '#0046E7']}
        style={styles.colorsBackground}></LinearGradient>
      <ModalText onClick={() => {}} />
    </SafeAreaView>
  );
};

export default TextStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  colorsBackground: {
    width: '100%',
    height: '100%',
  },
});
