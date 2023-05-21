import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

interface GalleryImageProps {
  // id: string;
  image: string;
  // path: string;
  marginRightNone: boolean;
  // viewableItems: Animated.SharedValue<ViewToken[]>;
}

const GalleryImage = ({
  // id,
  // path,
  image,
  // viewableItems,
  marginRightNone,
}: GalleryImageProps) => {
  const navigation = useNavigation<any>();
  // const rStyle = useAnimatedStyle(() => {
  // const isVisible = viewableItems.value
  //   .filter(item => item.isViewable)
  //   .find(viewableItem => viewableItem.item.id === id);
  // return {
  // opacity: withTiming(isVisible ? 1 : 0),
  // transform: [
  //   {
  //     scale: withTiming(isVisible ? 1 : 0.6),
  //   },
  // ],
  // };
  // }, []);
  const onSubmit = useCallback(() => {
    navigation.navigate('ImageEditor', {image});
  }, [navigation]);
  return (
    <TouchableOpacity
      onPress={() => onSubmit()}
      style={{...styles.container, marginRight: marginRightNone ? 0 : 2}}>
      <Animated.View
        style={[
          {width: '100%'},
          // rStyle,
        ]}>
        <Image source={{uri: image}} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(GalleryImage);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '33%',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
