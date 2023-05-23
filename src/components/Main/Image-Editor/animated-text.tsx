import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet, Text, View} from 'react-native';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface AnimatedTextProps {
  text: string;
}

const SIZE = 100.0;

type ContextType = {
  translateX: number;
  translateY: number;
};

const AnimatedText = ({text}: AnimatedTextProps) => {
  const translateX = useSharedValue(140);
  const translateY = useSharedValue(400);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    // onEnd: event => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.textSection, rStyle]}>
        <Animated.Text style={styles.text}>{text}</Animated.Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({
  textSection: {
    borderRadius: 10,
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
