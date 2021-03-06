import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import {inject, observer} from 'mobx-react';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const BarberOptionsScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.navigate('BarberScreen');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    navigation.navigate('BarberScreen');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  const onPressMakeAppointment = () => {
    navigation.navigate('ChoosingHairCutScreen');
  };
  const onPressWaze = () => {
    Linking.openURL(
      'https://www.waze.com/ul?ll=' +
        barberPageViewStores.barberLocation.lat +
        '%2C' +
        barberPageViewStores.barberLocation.lng +
        '&navigate=yes&zoom=17',
    );
  };
  const onPressOnAboutBarberScreen = () => {
    navigation.navigate('AboutBarberScreen');
  };

  const openImagePage = () => {
    navigation.navigate('BarberImageScreen');
  };

  return (
    <View>
      <Header
        headerName={barberPageViewStores.barberName}
        openDrawerFunc={openDrawer}
      />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View style={styles.background}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <TouchableOpacity
            onPress={openImagePage}
            style={[styles.cardStyle, {backgroundColor: Colors.lightPurple}]}>
            <View style={styles.inCardStyle}>
              <Icon name="camera" color={Colors.black} size={80} />
            </View>
            <Text style={styles.textStyle}>Barber Images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressOnAboutBarberScreen}
            style={[styles.cardStyle, {backgroundColor: Colors.lightYellow}]}>
            <View style={styles.inCardStyle}>
              <Icon name="info" color={Colors.black} size={80} />
            </View>
            <Text style={styles.textStyle}>About your barber</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={onPressMakeAppointment}
            style={[styles.cardStyle, {backgroundColor: Colors.lightGreen}]}>
            <View style={styles.inCardStyle}>
              <Icon name="calendar-day" color={Colors.black} size={80} />
            </View>
            <Text style={styles.textStyle}>Make appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressWaze}
            style={[styles.cardStyle, {backgroundColor: Colors.lightNavy}]}>
            <View style={styles.inCardStyle}>
              <Icon name="waze" color={Colors.black} size={80} />
            </View>
            <Text style={[styles.textStyle, {marginTop: 20}]}>Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
  background: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    marginTop: 20,
    borderRadius: 20,
    height: 220,
    width: 175,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
  },
  inCardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default inject('barberPageViewStores')(observer(BarberOptionsScreen));
