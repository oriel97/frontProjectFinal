import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {FunctionComponent} from 'react';
import {Colors} from '../utils/color';

interface Iprops {
  isPassword: boolean;
  stylesProp: any;
  placeHolder: string;
  onChangeText: any;
  value: any;
}

const Input: FunctionComponent<Iprops> = ({
  isPassword,
  stylesProp,
  placeHolder,
  onChangeText,
  value,
}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      secureTextEntry={isPassword}
      style={{...styles.input, ...stylesProp}}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '70%',
    borderColor: Colors.black,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
});
export default Input;
