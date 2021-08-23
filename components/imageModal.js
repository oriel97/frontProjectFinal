import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Avatar} from 'react-native-elements';

interface IProps {
  image: any;
  avatar: any;
  barberName: string;
  description: string;
}

const ImageModal: FunctionComponent<IProps> = ({
  image,
  avatar,
  name,
  description,
}) => {
  if (!image) {
    return null;
  }
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Image source={avatar || ''} width={15} height={15} />
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>
          {name || ''}
        </Text>
      </View>
      <Image source={image || ''} width={'100%'} height={150} />
      <Text
        style={{
          marginTop: 10,
          marginBottom: 15,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {description || ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageModal;
