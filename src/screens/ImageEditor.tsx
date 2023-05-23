import {
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {AnimatedText, ModalText, StickerModal} from '../components';

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const useFollowAnimatedPosition = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });
  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: followX.value}, {translateY: followY.value}],
    };
  });
  return {followX, followY, rStyle};
};

const ImageEditor = ({route}: any) => {
  const {image} = route.params;
  const navigation = useNavigation<any>();
  const [texts, setTexts] = useState<TextObject[]>([]);
  const [textVisible, setTextVisible] = useState<boolean>(false);

  //
  const stickerRef = useRef<BottomSheet>(null);
  const [isStickerOpen, setIsStickerOpen] = useState<boolean>(false);
  const StickerOnSubmit = useCallback(() => {
    stickerRef.current?.snapToIndex(0);
    setIsStickerOpen(true);
  }, []);
  // --------------------

  const onTextClick = useCallback(() => {
    setTextVisible(true);
  }, [textVisible]);

  const onCapture = useCallback((uri: any) => {
    console.log(uri);
  }, []);

  const right_buttons = [
    {text: 'Stickers', setVisible: setTextVisible, onClick: StickerOnSubmit},
    {text: 'Text', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Music', setVisible: setTextVisible, onClick: onCapture},
    {text: 'Effects', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Draw', setVisible: setTextVisible, onClick: onTextClick},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          {/* Header Buttons */}
          <Pressable
            style={styles.closeBtn}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assest/icons/icon.php.png')}
              style={styles.closeIcon}
            />
          </Pressable>

          <View style={styles.rightBtnsSection}>
            {right_buttons.map(el => (
              <Pressable onPress={el.onClick} key={el.text}>
                <Text style={styles.rightText}>{el.text}</Text>
              </Pressable>
            ))}
          </View>
          {/* Header Buttons */}
          {/* Content Section */}
          {/* <GestureDetector gesture={gesture}> */}
          <ViewShot style={styles.viewShot} onCapture={onCapture}>
            <ImageBackground
              style={styles.imageBackground}
              source={{uri: image}}>
              {texts.length !== 0 ? (
                <>
                  {texts.map((el, idx) => {
                    return <AnimatedText text={el.text} key={idx} />;
                  })}
                </>
              ) : null}
            </ImageBackground>
          </ViewShot>

          {/* Modals */}
          <ModalText
            texts={texts}
            visible={textVisible}
            setTexts={setTexts}
            setVisible={setTextVisible}
          />
          {/*  */}
          {/* </GestureDetector> */}
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
});
