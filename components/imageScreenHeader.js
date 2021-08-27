import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {Colors} from '../utils/color';

interface IProps {
  imageListLength: number;
  barberPageViewStores?: IBarberPageViewStore;
}

const ImageScreenHeader: FunctionComponent<IProps> = ({
  imageListLength,
  barberPageViewStores,
}) => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          containerStyle={{margin: 10, flex: 3.5}}
          source={{uri: barberPageViewStores?.barber.picture}}
          size={130}
          rounded={true}
        />
        <View
          style={{
            flex: 7.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <Text style={{fontWeight: 'bold'}}>{imageListLength}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Posts</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <Text>{barberPageViewStores?.barber?.followers}</Text>
              <Text>Followers</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <Text>{barberPageViewStores?.barber?.grade}/5</Text>
              <Text>Grade</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              borderWidth: 1,
              width: 215,
              borderRadius: 4,
              borderColor: Colors.black,
            }}>
            <Text>follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default inject('barberPageViewStores')(observer(ImageScreenHeader));
