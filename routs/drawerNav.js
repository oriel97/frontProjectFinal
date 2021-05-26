import React from 'react';
import {FunctionComponent} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawContent from '../components/drawConrtent';
import BarberScreen from '../screens/barberScreen';
import SettingScreen from '../screens/settingScreen';
import AboutScreen from '../screens/aboutScreen';

interface IProps {
  navigation: any;
}

const DrawerNav: FunctionComponent<IProps> = ({navigation}) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawContent navigation={navigation} />}>
      <Drawer.Screen name="BarberScreen" component={BarberScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
