import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
import {FunctionComponent} from 'react';
import {Colors} from '../utils/color';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {initFromLocalStorage} from '../api/phoneStorage';
import {inject, observer} from 'mobx-react';
import getUserInfo from 'api/apiRequests';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const OpenScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const tryToFindUser = async () => {
    let returnObj = {};
    try {
      returnObj = await initFromLocalStorage().then(value => value);
      if (Object.keys(returnObj).length > 0) {
        const userInfo = await getUserInfo();
        barberPageViewStores.setLogin(
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
  }, 2000);

  return (
    <View style={{backgroundColor: Colors.lightGrey}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: 'red',
            fontStyle: 'italic',
            fontSize: 40,
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
          }}>
          Welcome!
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default inject('barberPageViewStores')(observer(OpenScreen));
