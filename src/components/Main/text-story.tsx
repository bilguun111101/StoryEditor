import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ModalText from './Modals/text-modal';
import React, {useCallback, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TextObject {
  text: string;
}

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

const TextStory = () => {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(true);
  const [texts, setTexts] = useState<TextObject[]>([]);

  const onClose = useCallback(() => {
    setVisible(true);
    setTexts([]);
    navigation.goBack();
  }, [navigation]);

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

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <GestureDetector gesture={gesture}> */}
        <StatusBar barStyle="light-content" />
        <View>
          <LinearGradient
            colors={['#4D83FF', '#205EED', '#0046E7']}
            style={styles.colorsBackground}>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <Image
                source={{
                  uri: 'https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close',
                }}
                style={styles.closeIcon}
              />
            </Pressable>

            {(() => {
              if (texts.length !== 0) {
                return (
                  <GestureDetector gesture={gesture}>
                    <Animated.View
                      style={[styles.textSection, rBlueCircleStyle]}>
                      <Animated.Text style={styles.text}>
                        {texts[texts.length - 1]?.text}
                      </Animated.Text>
                    </Animated.View>
                  </GestureDetector>
                );
              }
              return null;
            })()}
          </LinearGradient>
        </View>
        {/* </GestureDetector> */}
      </GestureHandlerRootView>
      <ModalText
        texts={texts}
        visible={visible}
        setTexts={setTexts}
        setVisible={setVisible}
      />
    </SafeAreaView>
  );
};

export default TextStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  colorsBackground: {
    padding: 20,
    width: '100%',
    height: '100%',
  },
  closeBtn: {},
  closeIcon: {
    width: 20,
    height: 20,
  },
  section: {
    width: '100%',
    height: '100%',
    position: 'relative',
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
