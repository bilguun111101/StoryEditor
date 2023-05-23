import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface NextPageProps {
  route: any;
}

const NextPage = ({route}: NextPageProps) => {
  const {image} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: image}} style={{width: '100%', height: '100%'}} />
    </SafeAreaView>
  );
};

export default NextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
