import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

interface ChooseStoryTypeProps {
  id: string;
  path: string;
  text: string;
  image: string;
  color: string[];
}

const ChooseStoryType = ({
  id,
  text,
  path,
  image,
  color,
}: ChooseStoryTypeProps) => {
  const navigation = useNavigation<any>();
  const onSubmit = useCallback(() => {
    navigation.navigate(path);
  }, [path]);
  return (
    <Pressable onPress={onSubmit}>
      <LinearGradient colors={color} style={styles.container}>
        <View>
          <View style={styles.iconSection}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default ChooseStoryType;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSection: {
    width: 50,
    height: 50,
    padding: 13,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    color: '#fff',
    flexWrap: 'wrap',
    fontWeight: '500',
    textAlign: 'center',
  },
});
