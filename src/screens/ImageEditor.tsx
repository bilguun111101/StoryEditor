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
import React, {useCallback, useRef, useState} from 'react';
import ModalText from '../components/Main/modal';

import {Dimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {StickerModal} from '../components';
import BottomSheet from '@gorhom/bottom-sheet';

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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const SIZE = 80;

const ImageEditor = ({route}: any) => {
  const {image} = route.params;
  const navigation = useNavigation<any>();
  const [texts, setTexts] = useState<TextObject[]>([]);
  const [textVisible, setTextVisible] = useState<boolean>(false);

  //
  const sheetRef = useRef<BottomSheet>(null);
  const [isStickerOpen, setIsStickerOpen] = useState<boolean>(false);
  const StickerOnSubmit = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
    setIsStickerOpen(true);
  }, []);
  //

  // =======================
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  const {
    // followX: blueFollowX,
    // followY: blueFollowY,
    rStyle: rBlueCircleStyle,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });
  // --------------------

  const onTextClick = useCallback(() => {
    setTextVisible(true);
  }, [textVisible]);

  const right_buttons = [
    {text: 'Stickers', setVisible: setTextVisible, onClick: StickerOnSubmit},
    {text: 'Text', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Music', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Effects', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Draw', setVisible: setTextVisible, onClick: onTextClick},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={gesture}>
          <ImageBackground source={{uri: image}} style={styles.imageBackground}>
            {texts.length !== 0
              ? (() => {
                  return (
                    <Animated.View
                      style={[styles.textSection, rBlueCircleStyle]}>
                      <Animated.Text style={styles.text}>
                        {texts[texts.length - 1].text}
                      </Animated.Text>
                    </Animated.View>
                  );
                })()
              : null}
            {/*  */}
            <View style={styles.headerSection}>
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  source={{
                    uri: 'https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close',
                  }}
                  style={styles.closeBtn}
                />
              </Pressable>

              <View style={[styles.headerRightBtnsSection]}>
                {right_buttons.map((el, idx) => {
                  const {text, setVisible, onClick} = el;
                  const onSubmit = useCallback(() => {
                    onClick();
                  }, [setVisible, onClick]);
                  return (
                    <TouchableOpacity
                      key={el.text}
                      onPress={onSubmit}
                      style={styles.rightBtnSection}>
                      <Text style={styles.rightBtnText}>{text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/*  */}
          </ImageBackground>
        </GestureDetector>
        <ModalText
          setTexts={setTexts}
          visible={textVisible}
          setVisible={setTextVisible}
          texts={texts}
        />

        {isStickerOpen ? (
          <StickerModal
            isOpen={isStickerOpen}
            setIsOpen={setIsStickerOpen}
            onSubmit={StickerOnSubmit}
            ref={sheetRef}
          />
        ) : null}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ImageEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  closeBtn: {
    width: 20,
    height: 20,
  },
  headerSection: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRightBtnsSection: {
    flexDirection: 'column',
    gap: 20,
  },
  rightBtnSection: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textShadowRadius: 1,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  textSection: {
    borderRadius: 10,
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
