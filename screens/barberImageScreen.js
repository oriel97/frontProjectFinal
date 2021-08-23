import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import {fonts} from 'react-native-elements/dist/config';
import {inject, observer} from 'mobx-react';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const BarberImageScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Header headerName={'Barber images'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
});
export default inject('barberPageViewStores')(observer(BarberImageScreen));
