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

interface IProps {
  image: base64;
  avatar: base64;
  barberName: string;
  description: string;
  navigation: any;
}

const ImageModal: FunctionComponent<IProps> = ({
  image,
  avatar,
  barberName,
  description,
  navigation,
}) => {
  const [readMore, setReadMore] = useState(description.length > 40);
  const onPressForMore = () => {
    setReadMore(false);
  };
  let shortDescription = description;
  if (description.length > 40) {
    shortDescription = shortDescription.substring(0, 40) + '... more';
  }
  useEffect(() => {
    return navigation.addListener('focus', () => {
      setReadMore(description.length > 40);
    });
  });
  return (
    <View>
      <View style={styles.avatarAndName}>
        <Avatar rounded source={{uri: avatar}} size="small" />
        <Text style={styles.nameText}>{barberName || ''}</Text>
      </View>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.nameAndDescription}>
        <Text style={styles.nameDown}>{barberName || ''}</Text>
        <TouchableWithoutFeedback onPress={onPressForMore}>
          <Text style={styles.description}>
            {readMore ? shortDescription : description || ''}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarAndName: {flexDirection: 'row', margin: 10},
  nameText: {fontSize: 15, fontWeight: 'bold', marginLeft: 10, top: 5},
  image: {width: '100%', height: 300},
  nameAndDescription: {flexDirection: 'row', marginTop: 10, width: '100%'},
  nameDown: {
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginBottom: 15,
    width: 300,
    fontSize: 15,
    marginRight: 10,
  },
});

export default ImageModal;
