import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FunctionComponent} from 'react';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import {fonts} from 'react-native-elements/dist/config';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}
const AboutScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <Header headerName={'About page'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.headline}>Little bit about ourself...</Text>
        <Text style={{fontSize: 15}}>
          hello, let me tell you a little bit about ourself and about our
          project! this project is part from a finale project we are doing. this
          project is an app that her meanings is to help....
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
  text: {marginLeft: 10, marginTop: 10},
  headline: {
    fontWeight: 'bold',
    fontSize: 25,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
});
export default AboutScreen;
