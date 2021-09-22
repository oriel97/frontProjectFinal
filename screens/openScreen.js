import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import {FunctionComponent} from 'react';
import {Colors} from '../utils/color';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {initFromLocalStorage} from '../api/phoneStorage';
import {inject, observer} from 'mobx-react';
import Api from '../api/apiRequests';
import {wallpaper} from '../utils/imageUtils';
import {IUserStore} from '../Interfaces/view-store.types';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  userStore: ?IUserStore;
  navigation: any;
}

const OpenScreen: FunctionComponent<IProps> = ({
  userStore,
  barberPageViewStores,
  navigation,
}) => {
  const tryToFindUser = async () => {
    let returnObj = {};
    try {
      returnObj = await initFromLocalStorage().then(value => value);
      if (Object.keys(returnObj).length > 0) {
        const userInfo = await Api.getUserInfo(returnObj.userId);
        userStore.setLogin(
          returnObj.userName,
          returnObj.userId,
          userInfo.gender,
          userInfo.email,
          userInfo.city,
        );
      }
    } catch (error) {
      returnObj = {};
    }
    return returnObj;
  };

  setTimeout(async () => {
    const returnObj = await tryToFindUser();
    if (Object.keys(returnObj).length === 0) {
      navigation.navigate('LoginWindow');
    } else {
      navigation.navigate('DrawerNav');
    }
  }, 3000);

  return (
    <View style={{backgroundColor: Colors.lightGrey}}>
      <Image source={{uri: wallpaper}} style={styles.imageStyle} />
      <Text style={styles.textStyle}>Lets Get Cut!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    top: 200,
    right: 60,
    elevation: 10,
    position: 'absolute',
    color: 'red',
    fontStyle: 'italic',
    fontSize: 80,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    transform: [{rotate: '20deg'}],
  },
});
export default inject(
  'barberPageViewStores',
  'userStore',
)(observer(OpenScreen));
