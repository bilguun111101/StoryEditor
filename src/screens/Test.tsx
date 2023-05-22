import React, {useEffect} from 'react';
import Sound from 'react-native-sound';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Test = () => {
  useEffect(() => {
    Sound.setCategory('Playback');
    const whoosh = new Sound('', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      console.log(
        `duration is seconds: ${whoosh.getDuration()} number of channels: ${whoosh.getNumberOfChannels()}`,
      );

      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
          return;
        }
        console.log('playback failed due to audio decording errors');
      });
    });

    whoosh.setVolume(0.5);
    whoosh.setPan(1);
    whoosh.setNumberOfLoops(-1);
    console.log(`volume: ${whoosh.getVolume()}`);
    console.log(`pan: ${whoosh.getPan()}`);
    console.log(`loops: ${whoosh.getNumberOfLoops()}`);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello world</Text>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
