import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {FunctionComponent} from 'react';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';

interface IProps {
  navigation: any;
}
const AboutScreen: FunctionComponent<IProps> = ({navigation}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.navigate('BarberScreen');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    navigation.navigate('BarberScreen');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);
  return (
    <SafeAreaView>
      <Header headerName={'About page'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.headline}>Little bit about ourself...</Text>
        <Text style={styles.normalSize}>
          {'Hello, let us tell you a little bit about ourself and about our project!\n' +
            'This project is part from a finale project in Bar Ilan university that' +
            'we are doing.\n' +
            'this project is an app that her meanings is to help a large amount of customers to choose the right barber for them.\n' +
            'today there is no product in the market that his purpose is to help the customers to choose the right barber for them and' +
            ' help them to contact him in the same app and in the other hand help the barber to controls his client schedule.\n' +
            'The idea behind that is the understunding that  there is not an easy way to choose your baber today and even that the' +
            +' application is about barbers the application could have been on a wide' +
            'range of topics such as gel nail polish and more.' +
            'Our names - the developers of the Application is Oriel Asraf and Tomer Sultinian.'}
        </Text>
        <Text style={styles.name}>Oriel Asraf -</Text>
        <Text style={styles.normalSize}>
          - 26 years old,married,from Netanya, 3rd year for computer science in
          Bar ilan university and work as a frontend developer at Phytech.
        </Text>
        <Text style={styles.name}>Tomer Sultinian -</Text>
        <Text style={styles.normalSize}>
          23 years old,from Rishon Letzion,3rd year for computer science in Bar
          ilan university.
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backIcon: {position: 'absolute', right: 20, top: 20},
  text: {marginLeft: 10, marginTop: 10, marginRight: 10},
  headline: {
    fontWeight: 'bold',
    fontSize: 25,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  normalSize: {fontSize: 17},
});
export default AboutScreen;
