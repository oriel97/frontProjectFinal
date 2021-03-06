import React, {FunctionComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utils/color';
import {inject, observer} from 'mobx-react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {singedOut} from '../api/phoneStorage';
import {IUserStore} from '../Interfaces/view-store.types';

interface IProps {
  navigation: any;
  barberPageViewStores?: IBarberPageViewStore;
  userStore?: IUserStore;
}

const DrawContent: FunctionComponent<IProps> = ({
  navigation,
  barberPageViewStores,
  userStore,
}) => {
  const [loading, setLoading] = useState(false);
  const singedOutHandler = async () => {
    try {
      setLoading(true);
      await singedOut();
      userStore.setLogin('', '');
      barberPageViewStores.setList([]);
      setLoading(false);
      navigation.navigate('LoginWindow');
    } catch (error) {}
  };

  const goToAboutPage = () => {
    navigation.navigate('AboutScreen');
  };
  const goToAppointmentPage = () => {
    navigation.navigate('AppointmentScreen');
  };
  const goToBarberPage = () => {
    navigation.navigate('BarberScreen');
  };
  const goToMoviesPage = () => {
    navigation.navigate('VideoScreen');
  };

  const goToUserImagePage = () => {
    navigation.navigate('UserImageScreen');
  };

  return (
    <View>
      <Text style={styles.userName}>{userStore.userName}</Text>
      <Text style={styles.email}>{userStore.userEmail}</Text>
      <Text style={styles.city}>{userStore.userCity}</Text>
      <View style={{paddingLeft: 20}}>
        <TouchableOpacity
          onPress={goToMoviesPage}
          style={[styles.touch, {marginTop: 0}]}>
          <View style={styles.directionRow}>
            <Icon
              name="video-camera"
              color={Colors.black}
              size={24}
              style={{paddingTop: 2}}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>HELP</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToBarberPage} style={styles.touch}>
          <View style={styles.directionRow}>
            <Icon
              name="scissors"
              color={Colors.black}
              size={24}
              style={{paddingTop: 2}}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>BARBERS</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToAppointmentPage} style={styles.touch}>
          <View style={styles.directionRow}>
            <Icon
              name="calendar"
              color={Colors.black}
              size={24}
              style={{paddingTop: 2}}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>APPOINTMENT</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToAboutPage} style={styles.touch}>
          <View style={styles.directionRow}>
            <Icon
              name="info"
              color={Colors.black}
              size={24}
              style={styles.icon}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>ABOUT</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToUserImagePage} style={styles.touch}>
          <View style={styles.directionRow}>
            <Icon
              name="camera"
              color={Colors.black}
              size={24}
              style={styles.icon}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>
              HAIR CUT IDEAS
            </Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        {loading && (
          <ActivityIndicator
            color={Colors.black}
            size={'large'}
            style={styles.loading}
          />
        )}
        <TouchableOpacity onPress={singedOutHandler} style={styles.singedOut}>
          <View style={styles.arrowSignOut}>
            <Icon
              name="sign-out"
              color={Colors.black}
              size={24}
              style={styles.icon}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>SIGN OUT</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={styles.bold}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default inject(
  'barberPageViewStores',
  'userStore',
)(observer(DrawContent));

const styles = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: 30,
  },
  line: {
    backgroundColor: Colors.lightGrey,
    height: 2,
    marginRight: 10,
    marginTop: 50,
  },
  bold: {fontWeight: 'bold'},
  arrowSignOut: {flexDirection: 'row', marginRight: 100},
  drawerContent: {
    flex: 1,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  email: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 17,
  },
  city: {
    paddingLeft: 20,
    paddingBottom: 40,
    fontWeight: 'bold',
    fontSize: 17,
  },
  userName: {
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 7,
    fontSize: 30,
    fontWeight: 'bold',
  },
  loading: {
    justifyContent: 'center',
    top: 100,
  },
  icon: {
    paddingTop: 2,
    paddingRight: 15,
  },
  singedOut: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 20,
    top: 450,
  },
});
