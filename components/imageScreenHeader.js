import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';
import Api from '../api/apiRequests';
import {IUserStore} from '../Interfaces/view-store.types';

interface IProps {
  imageListLength: number;
  barberPageViewStores?: IBarberPageViewStore;
  openGradeBox: any;
  userStore?: IUserStore;
}

const ImageScreenHeader: FunctionComponent<IProps> = ({
  userStore,
  imageListLength,
  barberPageViewStores,
  openGradeBox,
}) => {
  const onPressFollow = async () => {
    barberPageViewStores.setFavorite(!barberPageViewStores.barber.favorite);
    await Api.makeFollowOrUnfollow(
      userStore.userId,
      barberPageViewStores.barberId,
    )
      .then()
      .catch(error => error);
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          containerStyle={{margin: 10, flex: 3.5}}
          source={{
            uri:
              'data:image/png;base64,' +
              barberPageViewStores?.barber.picture.substring(
                2,
                barberPageViewStores?.barber.picture.length - 1,
              ),
          }}
          size={130}
          rounded={true}
        />
        <View style={styles.optionContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.option}>
              <Text style={{fontWeight: 'bold'}}>{imageListLength}</Text>
              <Text style={styles.text}>Posts</Text>
            </View>
            <View style={styles.option}>
              <Text style={{fontWeight: 'bold'}}>
                {barberPageViewStores?.barber?.followers}
              </Text>
              <Text style={styles.text}>Followers</Text>
            </View>
            <View style={styles.option}>
              <Text style={{fontWeight: 'bold'}}>
                {barberPageViewStores?.barber?.grade}/5
              </Text>
              <Text style={styles.text}>Grade</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPressFollow} style={styles.follow}>
            <Text>
              {barberPageViewStores.barber.favorite ? 'unfollow' : 'follow '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGradeBox} style={styles.follow}>
            <Text>Grade the barber</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  optionContainer: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontWeight: 'bold', fontSize: 16},
  follow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    width: 225,
    borderRadius: 4,
    borderColor: Colors.black,
  },
});
export default inject(
  'barberPageViewStores',
  'userStore',
)(observer(ImageScreenHeader));
