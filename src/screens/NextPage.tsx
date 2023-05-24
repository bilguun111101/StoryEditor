import React, {useCallback, useEffect} from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
  Capability,
} from 'react-native-track-player';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface NextPageProps {
  route: any;
}

const NextPage = ({route}: NextPageProps) => {
  const {image} = route.params;
  const playBackState = usePlaybackState();

  const track = {
    id: 'trackId',
    url: require('../assest/sound/test.mp3'),
    title: 'Track Title',
    artist: 'Track Artist',
    artwork: image,
    duration: 100,
  };

  const setUpPlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add([track]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const togglePayBack = useCallback(async (playBackState: any) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }, []);

  useEffect(() => {
    // start();
    setUpPlayer();
    return () => {
      // TrackPlayer.destroy();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: image}} style={{width: '100%', height: '100%'}} />
      <Pressable
        onPress={async () => {
          await TrackPlayer.play();
        }}>
        <Text>On Submit</Text>
      </Pressable>
      {/* <Video source={video} style={{width: '100%', height: '100%'}} /> */}
    </SafeAreaView>
  );
};

export default NextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
