import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from 'react-native-navigation';
import {ImageEditor, Main} from '../screens';
import {NavigationContainer} from '@react-navigation/native';

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
      </Stck.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
