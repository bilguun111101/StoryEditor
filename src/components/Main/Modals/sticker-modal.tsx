import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface StickerModalProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const CONTENT_HEIGHT = SCREEN_HEIGHT - SCREEN_HEIGHT / 1.3;

const StickerModal = ({visible, setVisible}: StickerModalProps) => {
  const navigation = useNavigation<any>();
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withSpring(CONTENT_HEIGHT, {
      damping: 50,
    });
  }, [translateY.value]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
            <Image
              source={require('../../../assest/icons/icon.php.png')}
              style={styles.closeIcon}
            />
          </Pressable>
          <Animated.View style={[rBottomSheetStyle, styles.content]}>
            <ScrollView></ScrollView>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default StickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT - CONTENT_HEIGHT,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  contentScroll: {
    width: '100%',
    height: 'auto',
  },
});
