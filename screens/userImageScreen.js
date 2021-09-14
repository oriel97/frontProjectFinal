import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
} from 'react-native';
import {FunctionComponent} from 'react';

import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {inject, observer} from 'mobx-react';

import Header from '../components/header';
import Input from '../components/input';
import ImageModal from '../components/imageModal';

import {Colors} from '../utils/color';
import Api from '../api/apiRequests';
import {IUserStore} from '../Interfaces/view-store.types';
import {manImage, womenImage} from '../utils/imageUtils';

interface IProps {
  navigation: any;
  userStore?: IUserStore;
}

const UserImageScreen: FunctionComponent<IProps> = ({
  navigation,
  userStore,
}) => {
  const [addImage, setAddImage] = useState(false);
  const [addDescription, setAddDescription] = useState(false);
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.navigate('BarberScreen');
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    navigation.navigate('BarberScreen');
    setImage();
    setDescription('');
    setAddImage(false);
    setAddDescription(false);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        setImage('data:image/png;base64,' + response.assets[0].base64);
        setAddImage(false);
        setAddDescription(true);
        setDescription('');
      }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        setAddImage(false);
      } else if (response.error) {
        setAddImage(false);
      } else {
        setImage('data:image/png;base64,' + response.assets[0].base64);
        setAddImage(false);
        setAddDescription(true);
        setDescription('');
      }
    });
  };

  const onPressAddImage = () => {
    setAddDescription(false);
    userStore.addImageToImageList({image: image, description: description});
    Api.addUserImage(userStore.userId);
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const starter = async () => {
        try {
          const imageList = await Api.getUserImages(userStore.userId);
          userStore.setUserImages(imageList);
        } catch (e) {}
      };
      starter();
    });
  }, [userStore, navigation]);
  const onPressPlus = () => {
    setAddImage(true);
  };

  return (
    <View style={{backgroundColor: Colors.white, height: '100%'}}>
      <Header headerName={' images'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      {userStore.userImages.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => {
            return index;
          }}
          data={userStore?.userImages}
          renderItem={item => (
            <ImageModal
              topName={userStore.userName + ' - ' + userStore.userEmail}
              navigation={navigation}
              avatar={userStore.userGender === 'Male' ? manImage : womenImage}
              image={item.item.image}
              barberName={userStore.userName}
              description={item.item.description}
            />
          )}
        />
      ) : (
        <View style={styles.noImagesContainer}>
          <Text style={styles.noImagesText}>
            {'there is no images to present!\n add some images'}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onPressPlus} style={styles.plusIcon}>
        <Icon name={'plus'} size={30} />
      </TouchableOpacity>
      {addImage && <View style={styles.disabled} />}
      {addImage && (
        <View style={styles.finalBackground}>
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                setAddImage(false);
              }}>
              <Icon name={'times'} size={20} />
              <TouchableOpacity
                onPress={launchImageLibrary}
                style={styles.button}>
                <Text style={{fontWeight: 'bold'}}>Choose from library</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={launchCamera} style={styles.button}>
                <Text style={{fontWeight: 'bold'}}>Take a picture</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {addDescription && <View style={styles.disabled} />}
      {addDescription && (
        <View style={styles.finalBackground}>
          <View style={[styles.card, {height: 350}]}>
            <Icon
              onPress={() => setAddDescription(false)}
              name={'times'}
              size={20}
            />
            <Image style={styles.image} source={{uri: image}} />
            <Input
              stylesProp={{width: '100%'}}
              isPassword={false}
              placeHolder={'description...'}
              onChangeText={setDescription}
              value={description}
            />
            <TouchableOpacity
              style={styles.addimageButton}
              onPress={onPressAddImage}>
              <Text style={{fontWeight: 'bold'}}>Add the image</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  addimageButton: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: 120,
    height: 50,
    borderColor: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: Colors.lightGrey,
    width: 200,
    height: 50,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
  },
  card: {
    position: 'absolute',
    width: 300,
    height: 200,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 10000,
  },
  disabled: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  plusIcon: {
    width: 320,
    height: 50,
    borderWidth: 2,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
    alignSelf: 'center',
  },
  noImagesText: {textAlign: 'center', fontWeight: 'bold', fontSize: 30},
  noImagesContainer: {height: 500, justifyContent: 'center'},
});
export default inject('userStore')(observer(UserImageScreen));
