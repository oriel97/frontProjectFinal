import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {FunctionComponent} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {inject, observer} from 'mobx-react';

import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {IUserStore} from '../Interfaces/view-store.types';

import Header from '../components/header';
import ImageModal from '../components/imageModal';
import ImageScreenHeader from '../components/imageScreenHeader';

import {Colors} from '../utils/color';
import Api from '../api/apiRequests';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
  userStore?: IUserStore;
}

const BarberImageScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
  userStore,
}) => {
  const [openGradeBox, setOpenGradeBox] = useState(false);
  const onPressGrade = () => {
    setOpenGradeBox(true);
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    setGrade(0);
    navigation.goBack();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    setOpenGradeBox(false);
    setGrade(0);
    navigation.navigate('BarberOptionsScreen');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const starter = async () => {
        try {
          const imageList = await Api.getBarberImages(
            barberPageViewStores.barberId,
          );
          barberPageViewStores.setBarberImageList(imageList);
        } catch (e) {}
      };
      starter();
    });
  }, [barberPageViewStores, navigation]);

  const pressOnX = () => {
    setGrade(0);
    setOpenGradeBox(false);
  };
  const [grade, setGrade] = useState(0);
  const [loading, setLoading] = useState(false);
  const onPressOnStar = (starNumber: number) => {
    setGrade(starNumber);
  };

  const onPressOnSubmit = async () => {
    setLoading(true);
    await Api.giveGrade(userStore.userId, barberPageViewStores.barberId, grade);
    setLoading(false);
    setGrade(0);
    setOpenGradeBox(false);
  };

  return (
    <View style={styles.contain}>
      <Header headerName={'Barber images'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <ImageScreenHeader
        openGradeBox={onPressGrade}
        imageListLength={barberPageViewStores.barberImageList.length}
      />
      {barberPageViewStores.barberImageList.length > 0 && (
        <FlatList
          keyExtractor={(item, index) => {
            return index;
          }}
          data={barberPageViewStores?.barberImageList}
          renderItem={item => (
            <ImageModal
              navigation={navigation}
              image={item.item.image}
              avatar={
                'data:image/png;base64,' +
                barberPageViewStores?.barber.picture.substring(
                  2,
                  barberPageViewStores?.barber.picture.length - 1,
                )
              }
              barberName={barberPageViewStores?.barberName}
              description={item.item.description}
            />
          )}
        />
      )}
      {openGradeBox && <View style={styles.disabled} />}
      {openGradeBox && (
        <View style={styles.finalBackground}>
          <View style={styles.card}>
            <TouchableOpacity onPress={pressOnX} style={styles.x}>
              <Icon name="times" color={Colors.black} size={24} />
            </TouchableOpacity>
            <Text
              style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>
              Please grade the barber
            </Text>
            <View style={styles.stars}>
              <Icon
                name={'star'}
                size={40}
                color={grade >= 1 ? 'gold' : Colors.black}
                onPress={() => {
                  onPressOnStar(1);
                }}
              />
              <Icon
                name={'star'}
                color={grade >= 2 ? 'gold' : Colors.black}
                size={40}
                onPress={() => {
                  onPressOnStar(2);
                }}
              />
              <Icon
                name={'star'}
                color={grade >= 3 ? 'gold' : Colors.black}
                size={40}
                onPress={() => {
                  onPressOnStar(3);
                }}
              />
              <Icon
                name={'star'}
                color={grade >= 4 ? 'gold' : Colors.black}
                size={40}
                onPress={() => {
                  onPressOnStar(4);
                }}
              />
              <Icon
                name={'star'}
                color={grade >= 5 ? 'gold' : Colors.black}
                size={40}
                onPress={() => {
                  onPressOnStar(5);
                }}
              />
            </View>
            <TouchableOpacity onPress={onPressOnSubmit} style={styles.submit}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Colors.black} />
              ) : (
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {backgroundColor: Colors.white, height: '100%'},
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  submit: {
    marginTop: 20,
    borderColor: Colors.black,
    borderWidth: 2,
    alignSelf: 'center',
    width: 100,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  disabled: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 99998,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  card: {
    position: 'absolute',
    width: 300,
    height: 200,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 10000,
  },
  finalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
  },
});
export default inject(
  'barberPageViewStores',
  'userStore',
)(observer(BarberImageScreen));
