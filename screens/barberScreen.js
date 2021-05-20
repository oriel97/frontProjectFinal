import React from 'react';
import {inject, observer} from 'mobx-react';

import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import {singedOut} from '../api/phoneStorage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SettingScreen from './settingScreen';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}
const BarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const singedOutHandler = async () => {
    try {
      await singedOut();
      barberPageViewStores.setLogin('', '');
      navigation.navigate('LoginWindow');
    } catch (error) {}
  };
  return (
    <View>
      <View style={styles.button}>
        <TouchableOpacity onPress={singedOutHandler}>
          <Text style={{color: Colors.white}}>signed out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    width: '40%',
    height: 35,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
});
export default inject('barberPageViewStores')(observer(BarberScreen));
