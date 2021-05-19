import React from 'react';
import {View} from 'react-native';
import LoginWindow from './screens/loginWindow';
import CreateNewUser from './screens/createNewUser';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BarberScreen from './screens/barberScreen';
import OpenScreen from './screens/openScreen';
import {Colors} from './utils/color';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpenScreen">
        <Stack.Screen
          name="OpenScreen"
          component={OpenScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginWindow"
          component={LoginWindow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateNewUser"
          component={CreateNewUser}
          options={{headerTransparent: true, headerTitle: ''}}
        />
        <Stack.Screen
          name="BarberScreen"
          component={BarberScreen}
          options={{
            headerTitle: 'Choose your barber!',
            headerTitleStyle: {
              fontWeight: 'bold',
              left: 40,
            },
            headerStyle: {
              backgroundColor: Colors.middleBlue,
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
