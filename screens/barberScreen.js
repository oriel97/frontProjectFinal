import React from 'react';
import {inject, observer} from 'mobx-react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import {singedOut} from '../api/phoneStorage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SettingScreen from './settingScreen';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/card';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const BarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View>
      <Header headerName={'Barbers Menu'} openDrawerFunc={openDrawer} />
      <View style={styles.navBar}>
        <View style={styles.bell}>
          <TouchableOpacity>
            <Icon name="bell" color={Colors.black} size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.favorite}>
          <TouchableOpacity>
            <Icon name="thumbs-up" color={Colors.black} size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.sort}>
          <TouchableOpacity>
            <Icon name="sort-amount-up" color={Colors.black} size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bell: {
    marginLeft: 50,
    marginTop: 25,
    width: 40,
  },
  favorite: {
    width: 40,
    marginTop: 25,
    marginLeft: 100,
  },
  sort: {
    position: 'absolute',
    right: 50,
    marginTop: 25,
  },
  navBar: {
    position: 'absolute',
    top: 560,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 100,
    width: '100%',
    zIndex: 1000,
  },
});
export default inject('barberPageViewStores')(observer(BarberScreen));
