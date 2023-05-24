import {
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import React, {useCallback, useEffect, useRef, useState} from 'react';

// import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

import {
  PinchGestureHandler,
  GestureHandlerRootView,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import BottomSheet from '@gorhom/bottom-sheet';
import {AnimatedText, ModalText, StickerModal} from '../components';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ImageEditor = ({route}: any) => {
  const {image} = route.params;

  // Some variables
  const navigation = useNavigation<any>();
  const [texts, setTexts] = useState<TextObject[]>([]);
  const [textVisible, setTextVisible] = useState<boolean>(false);
  // View shot variable
  const view_shot_ref = useRef<any>();
  // Some reanimated values
  const scale = useSharedValue(1);
  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  // Modal variables
  const stickerRef = useRef<BottomSheet>(null);
  const [isStickerOpen, setIsStickerOpen] = useState<boolean>(false);
  const StickerOnSubmit = useCallback(() => {
    stickerRef.current?.snapToIndex(0);
    setIsStickerOpen(true);
  }, []);
  // --------------------

  // Click functions
  const onCapture = useCallback(async () => {
    try {
      const uri = await captureRef(view_shot_ref);
      // navigation.navigate('NextPage', {image: uri});
      // FFmpegKit.execute(
      //   `-i ${'../assest/sound/test.mp3'} -c:v mpeg4 ${uri}`,
      // ).then(async session => {
      //   const returnCode = await session.getReturnCode();
      //   if (ReturnCode.isSuccess(returnCode)) {
      //     // SUCCESS
      //     console.log(returnCode);
      //   } else if (ReturnCode.isCancel(returnCode)) {
      //     // CANCEL
      //   } else {
      //     // ERROR
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  }, [view_shot_ref.current]);

  const onTextClick = useCallback(() => {
    setTextVisible(true);
  }, [textVisible]);
  //

  // Gesture handlers
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        if (event.scale < 1) return;
        scale.value = event.scale;
      },
      onEnd: () => {
        scale.value = 1;
      },
    });
  //

  // Header buttons element
  const right_buttons = [
    {text: 'Stickers', setVisible: setTextVisible, onClick: StickerOnSubmit},
    {text: 'Text', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Music', setVisible: setTextVisible, onClick: onCapture},
    {text: 'Effects', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Draw', setVisible: setTextVisible, onClick: onTextClick},
  ];

  // Reanimated style
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  // useEffect(() => {
  // const dude = require('../assest/sound/aurealis-147578.mp3');
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          {/* Header Buttons */}
          <Pressable
            style={[styles.closeBtn]}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assest/icons/icon.php.png')}
              style={styles.closeIcon}
            />
          </Pressable>

          {/* Share Button */}
          <TouchableOpacity style={[styles.shareBtn]} onPress={onCapture}>
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
          {/* Share Button */}
          <View style={[styles.rightBtnsSection]}>
            {right_buttons.map(el => (
              <Pressable onPress={el.onClick} key={el.text}>
                <Text style={styles.rightText}>{el.text}</Text>
              </Pressable>
            ))}
          </View>
          {/* Header Buttons */}
          {/*  */}
          {/* Content Section */}
          <ViewShot
            ref={view_shot_ref}
            style={styles.viewShot}
            options={{format: 'png', quality: 1.0}}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <AnimatedImageBackground
                style={[styles.imageBackground, rStyle]}
                source={{uri: image}}>
                {texts.length !== 0 ? (
                  <>
                    {texts.map((el, idx) => {
                      return <AnimatedText text={el.text} key={idx} />;
                    })}
                  </>
                ) : null}
              </AnimatedImageBackground>
            </PinchGestureHandler>
          </ViewShot>
          {/* Modals */}
          <ModalText
            texts={texts}
            visible={textVisible}
            setTexts={setTexts}
            setVisible={setTextVisible}
          />
          {/* Modals */}
          {/*  */}
          {/* Content Section */}
        </View>
        <StickerModal visible={isStickerOpen} setVisible={setIsStickerOpen} />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ImageEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerSection: {
    width: '100%',
    zIndex: 100,
    position: 'absolute',
  },
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  rightBtnsSection: {
    position: 'absolute',
    gap: 20,
    top: 20,
    right: 20,
    zIndex: 100,
    flexDirection: 'column',
  },
  rightText: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  viewShot: {
    zIndex: 50,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  shareBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 100,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1DA1F2',
  },
  shareBtnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});

// const [photoUri, setPhotoUri] = useState(null);
// const [audioPath, setAudioPath] = useState(null);

// const selectPhoto = () => {
//   ImagePicker.showImagePicker({}, response => {
//     if (response.uri) {
//       setPhotoUri(response.uri);
//     }
//   });
// };

// const selectAudio = () => {
//   ImagePicker.launchImageLibrary({mediaType: 'audio'}, response => {
//     if (response.path) {
//       setAudioPath(response.path);
//     }
//   });
// };

// const mergeFiles = () => {
//   if (photoUri && audioPath) {
//     const mergedFileName = 'merged.mp4'; // Output file name

//     const dirs = RNFetchBlob.fs.dirs;
//     const photoPath = photoUri.replace('file://', '');
//     const audioExtension = audioPath.split('.').pop();

//     const mergedFilePath = `${dirs.CacheDir}/${mergedFileName}`;

//     // Merge photo and audio using FFmpeg command
//     const command = `-i ${photoPath} -i ${audioPath} -c:v copy -c:a aac ${mergedFilePath}`;

//     RNFetchBlob.fs.unlink(mergedFilePath).then(() => {
//       RNFetchBlob.fs.exists(photoPath).then(photoExists => {
//         if (photoExists) {
//           RNFetchBlob.fs.exists(audioPath).then(audioExists => {
//             if (audioExists) {
//               RNFetchBlob.config({fileCache: true})
//                 .fetch('POST', 'https://ffmpegserver.com/api/merge', {
//                   'Content-Type': 'application/json',
//                 })
//                 .then(response => {
//                   if (response.respInfo.status === 200) {
//                     // Play the merged file
//                     const mergedSound = new Sound(mergedFilePath, '', error => {
//                       if (!error) {
//                         mergedSound.play();
//                       }
//                     });
//                   }
//                 })
//                 .catch(error => {
//                   console.log('Merge failed: ', error);
//                 });
//             }
//           });
//         }
//       });
//     });
//   }
// };
