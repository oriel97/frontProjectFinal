import React from 'react';
import {FunctionComponent} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawContent from '../components/drawConrtent';
import BarberScreen from '../screens/barberScreen';
import AboutScreen from '../screens/aboutScreen';
import VideoScreen from '../screens/videoScreen';
import BarberOptionsScreen from '../screens/barberOptionsScreen';
import AboutBarberScreen from '../screens/aboutBarberScreen';

interface IProps {
  navigation: any;
  route: any;
}

const DrawerNav: FunctionComponent<IProps> = ({navigation, route}) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={() => (
        <DrawContent navigation={navigation} route={route} />
      )}>
      <Drawer.Screen name="BarberScreen" component={BarberScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="VideoScreen" component={VideoScreen} />
      <Drawer.Screen name="AboutBarberScreen" component={AboutBarberScreen} />
      <Drawer.Screen
        name="BarberOptionsScreen"
        component={BarberOptionsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
