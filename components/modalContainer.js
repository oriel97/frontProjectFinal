import React, {FunctionComponent, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';

interface IProps {
  headLine: string;
  children?: any;
  showFunc: any;
}

const ModalContainer: FunctionComponent<IProps> = ({
  headLine,
  children,
  showFunc,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showFunc}
        style={{position: 'absolute', right: 15, top: 17}}>
        <Icon name="times" color={Colors.black} size={24} />
      </TouchableOpacity>
      <View style={styles.headline}>
        <Text style={styles.headLineText}>{headLine}</Text>
      </View>
      <View style={styles.line} />
      <View>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 250,
    position: 'absolute',
    bottom: -85,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 10,
  },
  headline: {height: 60, justifyContent: 'center', alignItems: 'center'},
  headLineText: {textAlign: 'center', fontSize: 20, fontWeight: 'bold'},
  line: {height: 1, backgroundColor: 'grey'},
});

export default ModalContainer;
