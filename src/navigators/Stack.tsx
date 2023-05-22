import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from 'react-native-navigation';
import {CreateStorySettings, ImageEditor, Main} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import textModal from '../components/Create-Story-Settings/text-modal';

const Stck = createNativeStackNavigator();

const Stack = () => {
  return (
    <NavigationContainer>
      <Stck.Navigator>
        <Stck.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stck.Screen
          name="ImageEditor"
          component={ImageEditor}
          options={{headerShown: false}}
        />
        <Stck.Screen
          name="CreateStorySettings"
          component={CreateStorySettings}
        />
      </Stck.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
