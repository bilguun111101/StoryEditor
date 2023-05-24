import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface SelectDropdownProps {
  state: state;
  data: state[];
  visible: boolean;
  setState: (el: {contentType: state; visible: boolean}) => void;
}

const SelectDropdown = ({
  data,
  state,
  visible,
  setState,
}: SelectDropdownProps) => {
  const height = useSharedValue(200);

  useEffect(() => {
    if (!visible) {
      height.value = 0;
      return;
    }
    height.value = 200;
  }, [visible]);

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const rStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
    };
  });
  return (
    <Animated.View style={[styles.container, rStyle]}>
      <AnimatedTouchableOpacity style={styles.button}>
        <Animated.Text style={styles.text}>{state.text}</Animated.Text>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    bottom: -200,
    zIndex: 1000,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
