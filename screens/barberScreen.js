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
import BarberOptionsScreen from './barberOptionsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const BarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const [openOption, setOpenOption] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thereIsBarbers, setThereIsBarbers] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const sortOption = () => {
    if (barberPageViewStores.barberList.length > 0) {
      setOpenOption(!openOption);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      navigation.closeDrawer();
      const starter = async () => {
        const list = await Api.getBarbersList();
        barberPageViewStores.setList(list);
        if (barberPageViewStores.barberList.length > 0) {
          setThereIsBarbers(true);
        }
        setIsLoading(false);
      };
      starter().catch(e => {
        console.log(e);
      });
    });
  }, [navigation, barberPageViewStores]);

  const pressOnFavorite = () => {
    const retList = [];
    let list = barberPageViewStores.barberList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].favorite === true) {
        retList.push(list[i]);
      }
    }
    barberPageViewStores.setList(retList);
  };

  const onBarberPress = item => {
    barberPageViewStores.setBarberId(item.id);
    barberPageViewStores.setBarberName(item.barberName);
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
      <OptionsModal sortOption={sortOption} openOption={openOption} />

      <View style={styles.navBar}>
        <View style={styles.bell}>
          <TouchableOpacity>
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
});
export default inject('barberPageViewStores')(observer(BarberScreen));
