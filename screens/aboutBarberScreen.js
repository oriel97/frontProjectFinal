import React, {useEffect, useState} from 'react';
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
import {inject, observer} from 'mobx-react';
import Api from '../api/apiRequests';
import {IAboutBarber} from '../utils/utils';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const AboutBarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const starter = async () => {
      const barberInfo = await Api.getBarberInformation(
        barberPageViewStores.barberId,
      );
      barberPageViewStores.setBarberInfo(barberInfo);
      console.log(barberPageViewStores.barberInfo);
      setIsLoading(false);
    };
    starter().catch(e => {
      console.log(e);
    });
  }, [navigation, barberPageViewStores]);

  return (
    <SafeAreaView>
      <Header
        headerName={'About ' + barberPageViewStores.barberName}
        openDrawerFunc={openDrawer}
      />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
});
export default inject('barberPageViewStores')(observer(AboutBarberScreen));
