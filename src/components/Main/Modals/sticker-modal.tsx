import React, {useEffect, useRef} from 'react';
import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface StickerModalProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const StickerModal = ({visible, setVisible}: StickerModalProps) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 3, {duration: 200});
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      <GestureDetector gesture={gesture}>
        <Animated.ScrollView
          style={[styles.content, rBottomSheetStyle]}></Animated.ScrollView>
      </GestureDetector>
    </Modal>
  );
};

export default StickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    padding: 20,
    width: '100%',
    height: '100%',
  },
});
