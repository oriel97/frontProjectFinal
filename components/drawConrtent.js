import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utils/color';
interface IProps {
  navigation: any;
}
const DrawContent: FunctionComponent<IProps> = ({navigation}) => {
  return (
    <View>
      <Text style={styles.userName}>oriel111</Text>
      <Text style={styles.email}>oriel97@gmail.com</Text>
      <View style={{paddingLeft: 20}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="cog"
              color={Colors.black}
              size={24}
              style={{paddingTop: 2}}
            />
            <Text style={[styles.button, {paddingLeft: 10}]}>BARBER'S</Text>
          </View>
          <Icon
            name="angle-right"
            color={Colors.black}
            size={24}
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  email: {
    paddingLeft: 20,
    paddingBottom: 40,
  },
  userName: {
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 7,
    fontSize: 30,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
