import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

interface StickerModalProps {
  ref: any;
  isOpen: boolean;
  setIsOpen: (el: boolean) => void;
  onSubmit: (index: number) => void;
}

const StickerModal = ({
  ref,
  isOpen,
  onSubmit,
  setIsOpen,
}: StickerModalProps) => {
  const snapPoints = ['90%'];
  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      onClose={() => {
        setIsOpen(false);
      }}
      enablePanDownToClose={true}>
      <BottomSheetView>
        <Text>Hello world</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default StickerModal;

const styles = StyleSheet.create({});
