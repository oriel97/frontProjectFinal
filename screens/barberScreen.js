import React, {FunctionComponent, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import Header from '../components/header';
import Barber from '../components/barber';
import OptionsModal from '../components/barberScreenComponents/optionsModal';
import Api from '../api/apiRequests';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type {IBarber} from '../Interfaces/user';
import NotificationsModal from '../components/notificationsModal';
import {IUserStore} from '../Interfaces/view-store.types';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
  userStore?: IUserStore;
}

const BarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
  userStore,
}) => {
  const [openOption, setOpenOption] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thereIsBarbers, setThereIsBarbers] = useState(false);
  const [pressedNotification, setPressedNotification] = useState(false);

  const onNotificationPress = () => {
    setPressedNotification(!pressedNotification);
    userStore.setNotificationPressed(0);
    Api.pressOnNotificationButton(userStore.userId);
  };
  const onPressXNotifications = () => {
    setPressedNotification(false);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const sortOption = () => {
    if (barberPageViewStores?.barberList?.length > 0 && !pressedNotification) {
      setOpenOption(!openOption);
    }
  };

  setTimeout(function () {
    if (isLoading === true) {
      setIsLoading(false);
    }
  }, 7000);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      navigation.closeDrawer();
      const starter = async () => {
        const list = await Api.getBarbersList();
        barberPageViewStores.setList(list);
        if (barberPageViewStores?.barberList?.length > 0) {
          setThereIsBarbers(true);
        }
        setIsLoading(false);
      };
      starter().catch(e => {
        console.log(e);
      });
    });
  }, [navigation, barberPageViewStores]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const starter = async () => {
        await userStore.setNotifications(userStore.userId);
      };
      starter().catch(e => {
        console.log(e);
      });
    });
  });

  const pressOnFavorite = () => {
    if (!pressedNotification) {
      const retList = [];
      let list = barberPageViewStores.barberList;
      for (let i = 0; i < list?.length; i++) {
        if (list[i].favorite === true) {
          retList.push(list[i]);
        }
      }
      barberPageViewStores.setList(retList);
    }
  };

  const onBarberPress = (item: IBarber) => {
    barberPageViewStores.setBarberId(item.id);
    barberPageViewStores.setBarberName(item.barberName);
    barberPageViewStores.setBarberLocation(item.exactLocation);
    barberPageViewStores.setBarber(item);
    navigation.navigate('BarberOptionsScreen');
  };

  return (
    <View>
      <Header headerName={'Barbers Menu'} openDrawerFunc={openDrawer} />
      {isLoading && (
        <ActivityIndicator
          color={Colors.black}
          size={'large'}
          style={styles.loading}
        />
      )}
      {thereIsBarbers ? (
        <View style={{height: 500}}>
          <FlatList
            data={barberPageViewStores.barberList}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <View style={index === 0 && {marginTop: 30}}>
                <TouchableOpacity onPress={() => onBarberPress(item)}>
                  <Barber barber={item} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          {!isLoading && (
            <View style={{alignItems: 'center', marginTop: 200}}>
              <Text style={{fontWeight: 'bold', fontSize: 40}}>
                There is no barbers!
              </Text>
            </View>
          )}
        </View>
      )}
      {pressedNotification && <View style={styles.disabled} />}
      {pressedNotification && (
        <NotificationsModal onPressedX={onPressXNotifications} />
      )}
      <OptionsModal sortOption={sortOption} openOption={openOption} />
      <View style={styles.navBar}>
        <View style={styles.bell}>
          <TouchableOpacity onPress={onNotificationPress}>
            {!!userStore.unseenNotification &&
              userStore.unseenNotification > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: Colors.red,
                    width: 18,
                    height: 18,
                    borderRadius: 18,
                    left: 20,
                    zIndex: 1,
                  }}>
                  {userStore.unseenNotification < 9 ? (
                    <Text style={{left: 5, bottom: 1, color: Colors.white}}>
                      {userStore.unseenNotification}
                    </Text>
                  ) : (
                    <Text style={{color: Colors.white, left: 1, bottom: 1}}>
                      9+
                    </Text>
                  )}
                </View>
              )}
            <Icon name="bell" color={Colors.black} size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.favorite}>
          <TouchableOpacity onPress={pressOnFavorite}>
            <Icon name="thumbs-up" color={Colors.black} size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.sort}>
          <TouchableOpacity onPress={sortOption}>
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
    marginTop: 15,
    width: 40,
  },
  favorite: {
    width: 40,
    marginTop: 15,
    marginLeft: 100,
  },
  sort: {
    position: 'absolute',
    right: 50,
    marginTop: 15,
  },
  navBar: {
    position: 'absolute',
    top: 590,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 70,
    width: '100%',
    zIndex: 1000,
  },
  loading: {
    justifyContent: 'center',
    top: 220,
  },
  disabled: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
});
export default inject(
  'barberPageViewStores',
  'userStore',
)(observer(BarberScreen));
