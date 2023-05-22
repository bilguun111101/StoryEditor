import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Pressable,
  ViewToken,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {GalleryImage, ChooseStoryType} from '../components';
import React, {useCallback, useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import DATA from '../assest/json/create-story-choose-of-type-btns.json';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Photos {
  url: string;
}

const Main = () => {
  const [images, setImages] = useState<any>([]);
  const navigation = useNavigation<any>();
  const array = new Array(20).fill(0).map((_, idx) => ({
    id: `${idx + 1}`,
    path: '',
    image: 'https://pbs.twimg.com/media/FAOJe-_UcAQs5g3.jpg:large',
  }));

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const LoadLib = useCallback(async () => {
    const response = await launchImageLibrary(
      {selectionLimit: 1, mediaType: 'photo'},
      response => {
        return response;
      },
    );
    console.log(response);
  }, []);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    }).then(imagesArray => {
      setImages(
        imagesArray.edges.map((el, idx) => ({
          url: el.node.image.uri,
          id: `${idx++}`,
        })),
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <View style={styles.titleSection}>
          <Pressable onPress={() => {}}>
            <Image
              source={require('../assest/icons/Close-icon-9iuh.png')}
              style={styles.closeBtn}
            />
          </Pressable>
          <Text style={styles.title}>Create story</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('CreateStorySettings');
            }}>
            <Image
              source={require('../assest/icons/Setting-Icon-SVG-03mcds.png')}
              style={styles.settingsBtn}
            />
          </Pressable>
        </View>

        <FlatList
          data={DATA}
          contentContainerStyle={{
            gap: 30 / 4,
            marginTop: 20,
            paddingHorizontal: 20,
          }}
          horizontal
          renderItem={({item, index}) => {
            const {image, text, path, id, color} = item;
            return (
              <ChooseStoryType
                id={id}
                path={path}
                text={text}
                image={image}
                color={color}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />

        <View style={styles.gallerySelectSection}>
          <Pressable style={styles.gallerySelectTitleSection}>
            <Text style={styles.gallerySelectTitle}>Gallery</Text>
            <Image
              source={{
                uri: 'https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png',
              }}
            />
          </Pressable>

          <TouchableOpacity style={styles.selectMultiple} onPress={LoadLib}>
            <Image
              source={require('../assest/icons/Gallery-PNG-Images.png')}
              style={styles.selectMultipleIcon}
            />
            <Text style={styles.selectMultipleText}>Select Multiple</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={images}
          numColumns={3}
          contentContainerStyle={{
            gap: 2,
            paddingBottom: 270,
          }}
          // onViewableItemsChanged={event => {
          //   viewableItems.value = event.viewableItems;
          // }}
          renderItem={({item, index}) => {
            // const {id, path, image} = item;
            const {url} = item;
            return (
              <GalleryImage
                // id={id}
                // path={path}
                image={url}
                // viewableItems={viewableItems}
                marginRightNone={(index + 1) % 3 === 0}
              />
            );
          }}
          keyExtractor={item => item.url}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  gallerySelectSection: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gallerySelectTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  gallerySelectTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gallerySelectTitleImage: {
    width: 10,
    height: 5,
  },
  selectMultiple: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
  },
  selectMultipleIcon: {
    width: 15,
    height: 18,
  },
  selectMultipleText: {
    fontWeight: '400',
    fontSize: 13,
  },
  closeBtn: {
    width: 15,
    height: 15,
  },
  settingsBtn: {
    width: 25,
    height: 25,
  },
  content: {
    width: '100%',
  },
});
