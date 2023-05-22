import {Navigation} from 'react-native-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {CreateStorySettings, ImageEditor, Main} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TextStory} from '../components';
import Test from '../screens/Test';

const Stck = createNativeStackNavigator();

const Stack = () => {
  return (
    <NavigationContainer>
      <Stck.Navigator>
        <Stck.Screen
          name="Test"
          component={Test}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stck.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stck.Screen
          name="CreateStorySettings"
          component={CreateStorySettings}
        />
        <Stck.Screen
          name="ImageEditor"
          component={ImageEditor}
          options={{headerShown: false}}
        />
        <Stck.Screen
          name="TextStory"
          component={TextStory}
          options={{headerShown: false}}
        /> */}
      </Stck.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
