import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import {fonts} from 'react-native-elements/dist/config';
import {inject, observer} from 'mobx-react';
import ImageModal from '../components/imageModal';
import {imageBase64} from '../utils/imageUtils';
import Api from '../api/apiRequests';
import {citiesName} from '../utils/cities';
import type {IImage} from '../utils/utils';
import {Avatar} from 'react-native-elements';
import ImageScreenHeader from '../components/imageScreenHeader';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const UserImageScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };

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

  return (
    <View style={{backgroundColor: Colors.white, height: '100%'}}>
      <Header headerName={'Barber images'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <ImageScreenHeader
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
              avatar={barberPageViewStores?.barber.picture}
              barberName={barberPageViewStores?.barberName}
              description={item.item.description}
            />
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
});
export default inject('barberPageViewStores')(observer(UserImageScreen));
