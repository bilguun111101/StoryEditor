import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState} from 'react';

interface TextObject {
  text: string;
}

interface ModalTextProps {
  visible?: boolean;
  texts: TextObject[];
  onClick?: () => void;
  setVisible: (el: boolean) => void;
  setTexts: (el: TextObject[]) => void;
}

const ModalText = ({
  texts,
  visible,
  onClick,
  setTexts,
  setVisible,
}: ModalTextProps) => {
  const [text, setText] = useState<string>('');

  const onSubmit = useCallback(() => {
    if (!text) {
      setVisible(false);
      setText('');
      return;
    }
    setTexts([...texts, {text}]);
    setVisible(false);
    setText('');
    onClick ? onClick() : null;
  }, [visible, text]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      <SafeAreaView style={styles.section}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Pressable style={styles.doneButton} onPress={onSubmit}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>

            <TextInput
              value={text}
              style={styles.textInput}
              placeholder="Start typing"
              onChangeText={text => setText(text)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalText;

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#000',
  },
  doneButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  textInput: {
    fontSize: 20,
    borderRadius: 10,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
