import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet, Text, View} from 'react-native';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  RotationGestureHandler,
  RotationGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface AnimatedTextProps {
  text: string;
}

type ContextType = {
  translateX: number;
  translateY: number;
};

const AnimatedText = ({text}: AnimatedTextProps) => {
  // Reanimated shared values
  const translateX = useSharedValue(140);
  const translateY = useSharedValue(400);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(1);

  //Reanimated gesture handler events
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

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
      },
    });

  const rotationHandler =
    useAnimatedGestureHandler<RotationGestureHandlerGestureEvent>({
      onActive: event => {
        rotate.value = event.rotation * 20;
      },
    });

  // Reanimated style
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
        {rotate: `${rotate.value}deg`},
      ],
    };
  });

  return (
    <RotationGestureHandler onGestureEvent={rotationHandler}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View style={[styles.textSection, rStyle]}>
                <Animated.Text style={styles.text}>{text}</Animated.Text>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </RotationGestureHandler>
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
