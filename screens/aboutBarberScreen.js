import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import {inject, observer} from 'mobx-react';
import Api from '../api/apiRequests';

import {IAboutBarber} from '../utils/utils';
import {clear} from 'react-native/Libraries/LogBox/Data/LogBoxData';

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

  const [isOpenSummary, setIsOpenSummary] = useState(false);
  const [isOpenPhone, setIsOpenPhone] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenOpenHours, setIsOpenOpenHours] = useState(false);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const starter = async () => {
        const barberInfo = await Api.getBarberInformation(
          barberPageViewStores.barberId,
        );
        barberPageViewStores.setBarberInfo(barberInfo);
      };
      starter().catch(e => {
        console.log(e);
      });
      setIsOpenSummary(false);
      setIsOpenPhone(false);
      setIsOpenLocation(false);
      setIsOpenOpenHours(false);
    });
  }, [navigation, barberPageViewStores]);

  let barberHeadLine = '';
  if (barberPageViewStores?.barberInfo?.summary?.headline) {
    barberHeadLine = barberPageViewStores?.barberInfo?.summary?.headline;
    barberHeadLine = barberHeadLine?.split(' ');
  } else {
    return null;
  }

  const onPressSummary = () => {
    if (barberPageViewStores.barberInfo.summary) {
      setIsOpenSummary(!isOpenSummary);
    }
  };
  const onPressPhone = () => {
    if (barberPageViewStores?.barberInfo?.phoneNumber) {
      setIsOpenPhone(!isOpenPhone);
    }
  };
  const onPressLocation = () => {
    if (barberPageViewStores?.barberInfo?.location) {
      setIsOpenLocation(!isOpenLocation);
    }
  };
  const onPressOpenHours = () => {
    if (
      barberPageViewStores?.barberInfo?.openHour.length === 7 &&
      barberPageViewStores?.barberInfo?.closeHour.length === 7
    ) {
      setIsOpenOpenHours(!isOpenOpenHours);
    }
  };
  const dayOpenHours = (i: number) => {
    let openHours = barberPageViewStores?.barberInfo?.openHour[i];
    let closeHours = barberPageViewStores?.barberInfo?.closeHour[i];

    if (
      !openHours ||
      !closeHours ||
      openHours?.length === 0 ||
      closeHours?.length === 0 ||
      openHours.length !== closeHours.length
    ) {
      return 'day off!';
    }

    let retString = '';
    for (let j = 0; j < openHours?.length; j++) {
      retString = retString + openHours[j] + ' - ' + closeHours[j];
      if (j + 1 !== openHours?.length) {
        retString = retString + ', ';
      }
    }
    return retString;
  };

  return (
    <ScrollView>
      <Header
        headerName={'About ' + barberPageViewStores.barberName}
        openDrawerFunc={openDrawer}
      />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.headline}>{barberHeadLine[0]}</Text>
          <Text style={styles.headline}>
            {barberHeadLine[1] + ' ' + barberHeadLine[2]}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.plusHeadline}>Summary</Text>
          <TouchableOpacity onPress={onPressSummary} style={styles.backIcon}>
            <Icon
              name={isOpenSummary ? 'minus-circle' : 'plus-circle'}
              color={!isOpenSummary ? Colors.green : Colors.red}
              size={36}
            />
          </TouchableOpacity>
        </View>
        {isOpenSummary && (
          <View style={{marginBottom: 20, marginHorizontal: 40}}>
            <Text style={{fontSize: 20}}>
              {barberPageViewStores?.barberInfo?.summary?.sentence}
            </Text>
          </View>
        )}
        <View style={styles.line} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.plusHeadline}>Phone number</Text>
          <TouchableOpacity onPress={onPressPhone} style={styles.backIcon}>
            <Icon
              name={isOpenPhone ? 'minus-circle' : 'plus-circle'}
              color={!isOpenPhone ? Colors.green : Colors.red}
              size={36}
            />
          </TouchableOpacity>
        </View>
        {isOpenPhone && (
          <View style={{marginBottom: 20, marginHorizontal: 40}}>
            <Text style={{fontSize: 20}}>
              {barberPageViewStores?.barberName} -{' '}
              {barberPageViewStores?.barberInfo?.phoneNumber}
            </Text>
          </View>
        )}
        <View style={styles.line} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.plusHeadline}>Location</Text>
          <TouchableOpacity onPress={onPressLocation} style={styles.backIcon}>
            <Icon
              name={isOpenLocation ? 'minus-circle' : 'plus-circle'}
              color={!isOpenLocation ? Colors.green : Colors.red}
              size={36}
            />
          </TouchableOpacity>
        </View>
        {isOpenLocation && (
          <View style={{marginBottom: 20, marginHorizontal: 40}}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', fontStyle: 'italic'}}>
              Where you can find me??
            </Text>
            <Text style={{fontSize: 20, marginTop: 5}}>
              {barberPageViewStores?.barberInfo?.location}
            </Text>
          </View>
        )}
        <View style={styles.line} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.plusHeadline}>Open hours</Text>
          <TouchableOpacity onPress={onPressOpenHours} style={styles.backIcon}>
            <Icon
              name={isOpenOpenHours ? 'minus-circle' : 'plus-circle'}
              color={!isOpenOpenHours ? Colors.green : Colors.red}
              size={36}
            />
          </TouchableOpacity>
        </View>
        {isOpenOpenHours && (
          <View style={{marginBottom: 20, marginHorizontal: 40}}>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Sunday:   '}</Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(0)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Monday:   '}</Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(1)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Tuesday:   '} </Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(2)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Wednesday:   '} </Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(3)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Thursday:   '} </Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(4)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Friday:   '} </Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(5)}</Text>
              </ScrollView>
            </View>
            <View style={{marginBottom: 4, flexDirection: 'row'}}>
              <Text style={styles.day}>{'Saturday:   '} </Text>
              <ScrollView horizontal={true}>
                <Text style={styles.hours}>{dayOpenHours(6)}</Text>
              </ScrollView>
            </View>
          </View>
        )}
        <View style={[styles.line, {marginBottom: 20}]} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  hours: {fontSize: 20, marginTop: 3},
  day: {fontSize: 23, fontWeight: 'bold'},
  backIcon: {position: 'absolute', right: 20, top: 20},
  line: {
    height: 1,
    width: 340,
    backgroundColor: 'black',
    marginHorizontal: 40,
  },
  plusHeadline: {
    color: Colors.darkBlue,
    marginVertical: 20,
    marginLeft: 40,
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle: 'italic',
  },
  headline: {
    color: Colors.darkBlue,
    marginLeft: 40,
    fontWeight: 'bold',
    fontSize: 50,
    fontStyle: 'italic',
  },
});
export default inject('barberPageViewStores')(observer(AboutBarberScreen));
