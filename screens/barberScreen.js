import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Barber from '../components/barber';
import OptionsModal from '../components/barberScreenComponents/optionsModal';
import Api from '../api/apiRequests';

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
    console.log('Ssss');
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
  }, [navigation, barberPageViewStores]);

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
        <View style={{height: 500, marginTop: 30}}>
          <FlatList
            data={barberPageViewStores.barberList}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View>
                <Barber barber={item} />
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
          <TouchableOpacity>
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
