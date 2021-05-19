import React from 'react';
import {inject, observer} from 'mobx-react';

import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import {singedOut} from '../api/phoneStorage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}
const SettingScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  return (
    <View>
      <Text>setting</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default inject('barberPageViewStores')(observer(SettingScreen));
