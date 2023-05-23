import {TextStory} from '../components';
import NextPage from '../screens/NextPage';
import {NavigationContainer} from '@react-navigation/native';
import {CreateStorySettings, ImageEditor, Main} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stck = createNativeStackNavigator();

const Stack = () => {
  return (
    <NavigationContainer>
      <Stck.Navigator>
        {/* <Stck.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        /> */}
        <Stck.Group screenOptions={{presentation: 'card'}}>
          <Stck.Screen
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
          />
          <Stck.Screen name="NextPage" component={NextPage} />
        </Stck.Group>
      </Stck.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
