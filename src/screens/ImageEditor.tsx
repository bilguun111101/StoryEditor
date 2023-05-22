import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TextModal, {
  TextModalRefProps,
} from '../components/Create-Story-Settings/text-modal';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const ImageEditor = ({route}: any) => {
  const {image} = route.params;
  const navigation = useNavigation<any>();
  const [texts, setTexts] = useState<object[]>([]);
  const [textVisible, setTextVisible] = useState<boolean>(false);

  const textRef = useRef<TextModalRefProps>(null);

  const onTextClick = useCallback(() => {
    const isActive = textRef?.current?.isActive();
    if (isActive) {
      textRef?.current?.scrollTo(0);
    } else {
      textRef?.current?.scrollTo(-SCREEN_HEIGHT);
    }
  }, []);

  const right_buttons = [
    {text: 'Stickers', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Text', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Music', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Effects', setVisible: setTextVisible, onClick: onTextClick},
    {text: 'Draw', setVisible: setTextVisible, onClick: onTextClick},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GestureHandlerRootView style={{flex: 1}}>
        <ImageBackground source={{uri: image}} style={styles.imageBackground}>
          <View style={styles.headerSection}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={{
                  uri: 'https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close',
                }}
                style={styles.closeBtn}
              />
            </Pressable>

            <View style={styles.headerRightBtnsSection}>
              {right_buttons.map((el, idx) => {
                const {text, setVisible, onClick} = el;
                const onSubmit = useCallback(() => {
                  setVisible(true);
                  onClick();
                }, [setVisible, onClick]);
                return (
                  <TouchableOpacity
                    key={el.text}
                    style={styles.rightBtnSection}
                    onPress={onSubmit}>
                    <Text style={styles.rightBtnText}>{text}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ImageBackground>

        {/* <TextModal ref={textRef} /> */}
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
});
