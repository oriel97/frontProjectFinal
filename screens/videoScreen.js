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

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  navigation: any;
}

const VideoScreen: FunctionComponent<IProps> = ({navigation}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <Header headerName={'Video page'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Introduction</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Choose your barber</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Make appointment</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  textPart: {justifyContent: 'center', alignItems: 'center', flex: 4},
  iconPart: {
    backgroundColor: 'grey',
    flex: 3,
    height: 150,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 150,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 5,
  },
});
export default VideoScreen;
