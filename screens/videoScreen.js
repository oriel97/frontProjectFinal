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

import {inject, observer} from 'mobx-react';
import VideoFullScreen from '../components/videoFullScreen';
import {IVideosViewStore, Videos} from '../utils/videoUtils';

interface IProps {
  videoViewStore: IVideosViewStore;
  navigation: any;
}

const VideoScreen: FunctionComponent<IProps> = ({
  navigation,
  videoViewStore,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };
  const introductionPress = () => {
    videoViewStore.setOpenVideoPlayer();
    videoViewStore.setFullScreenMode();
    videoViewStore?.setTimeOfTheMovie(0);
    videoViewStore?.setVideoObject(Videos[0]);
    videoViewStore?.setMovieOnPlay(true);
  };
  const chooseBarberPress = () => {
    videoViewStore.setOpenVideoPlayer();
    videoViewStore.setFullScreenMode();
    videoViewStore?.setTimeOfTheMovie(0);
    videoViewStore?.setVideoObject(Videos[1]);
    videoViewStore?.setMovieOnPlay(true);
  };
  const makeAppointmentPress = () => {
    videoViewStore.setOpenVideoPlayer();
    videoViewStore.setFullScreenMode();
    videoViewStore?.setTimeOfTheMovie(0);
    videoViewStore?.setVideoObject(Videos[2]);
    videoViewStore?.setMovieOnPlay(true);
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Header headerName={'Video page'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <TouchableOpacity onPress={introductionPress} style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Introduction</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={chooseBarberPress} style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Choose your barber</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={makeAppointmentPress} style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconPart}>
            <Icon name="video" color={Colors.white} size={64} />
          </View>
          <View style={styles.textPart}>
            <Text style={styles.textStyle}>Make appointment</Text>
          </View>
        </View>
      </TouchableOpacity>
      {videoViewStore?.openVideoPlayer && <VideoFullScreen />}
    </View>
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
export default inject('videoViewStore')(observer(VideoScreen));
