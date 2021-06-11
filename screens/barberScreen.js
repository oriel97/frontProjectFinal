import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';

import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/card';
import Barber from '../components/barber';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const BarberScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [thereIsBarbers, setThereIsBarbers] = useState(false);
  const [barbers, setBarbers] = useState([]);
  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const starter = async () => {
      setIsLoading(true);
      await barberPageViewStores.setBarberList();
      setBarbers(barberPageViewStores.barberList);
      if (barbers.length > 0) {
        setThereIsBarbers(true);
      }
      setIsLoading(false);
    };
    starter();
  }, [barbers, barberPageViewStores]);

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
            data={barbers}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View>
                <Barber barber={item} />
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center', marginTop: 200}}>
          <Text style={{fontWeight: 'bold', fontSize: 40}}>
            There is no barbers!
          </Text>
        </View>
      )}

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
          <TouchableOpacity>
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
    top: 100,
  },
});
export default inject('barberPageViewStores')(observer(BarberScreen));
