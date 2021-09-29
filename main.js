import React from 'react';
import {View} from 'react-native';
import LoginWindow from './screens/loginWindow';
import CreateNewUser from './screens/createNewUser';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OpenScreen from './screens/openScreen';
import DrawerNav from './routs/drawerNav';

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
          name="DrawerNav"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
