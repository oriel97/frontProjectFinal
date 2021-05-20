import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}
const AboutScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  return (
    <View>
      <Text>about</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default AboutScreen;
