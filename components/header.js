import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../utils/color';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  headerName: string;
}
const Header: FunctionComponent<IProps> = ({headerName}) => {
  return (
    <View style={styles.backgound}>
      <Text style={styles.headerText}>{headerName}</Text>
      <TouchableOpacity style={styles.icon}>
        <Icon name="bars" color={Colors.black} size={36} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgound: {
    backgroundColor: Colors.white,
    height: 75,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
});

export default Header;
