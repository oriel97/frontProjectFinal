import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Video from 'react-native-video';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {inject, observer} from 'mobx-react';

import {IVideosViewStore} from 'typescript/view-store.types';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  videoViewStore?: IVideosViewStore;
}

const VideoFullScreen: React.FunctionComponent<IProps> = ({videoViewStore}) => {
  const [onStart, setOnStart] = useState(false);
  const [doesSeek, setDoesSeek] = useState(false);
  const onLoad = (data: any) => {
    videoViewStore?.setDurationOfMovie(data.duration);
  };

  const [timeOfTheMovie, setTimeOfTheMovie] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [touchTimeOut, setTouchTimeOut] = useState(null);
  const [pressedOnMoveBackward, setPressOnMoveBackward] = useState(false);
  const [pressedOnMoveForward, setPressOnMoveForward] = useState(false);
  const refVal = useRef(null);
  const moveForward = () => {
    setDoesSeek(true);
    let a = timeOfTheMovie + 15;
    // @ts-ignore
    refVal?.current?.seek(a);
    // @ts-ignores
    timeoutHandler();
    setPressOnMoveForward(!pressedOnMoveForward);
  };
  const moveBackward = () => {
    setDoesSeek(true);
    let a = timeOfTheMovie - 15;
    // @ts-ignore
    refVal?.current?.seek(a);
    timeoutHandler();
    setPressOnMoveBackward(!pressedOnMoveBackward);
  };
  const timeoutHandler = () => {
    if (touchTimeOut !== null) {
      clearTimeout(touchTimeOut);
    }
    let time = setTimeout(() => {
      setShowButtons(false);
    }, 5000);
    // @ts-ignore
    setTouchTimeOut(time);
  };
  const makeTime = (time: number) => {
    let h: any = Math.floor(time / 3600);
    time = time % 3600;
    let m: any = Math.floor(time / 60);
    time = time % 60;
    let s: any = time.toFixed();
    if (m < 10) {
      m = '0' + m;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (s < 10) {
      s = '0' + s;
    }
    return h + ':' + m + ':' + s;
  };
  const onSlide = (seek: any) => {
    setDoesSeek(true);
    // @ts-ignore
    refVal?.current?.seek(seek);
    timeoutHandler();
  };
  const TouchTheScreen = () => {
    setShowButtons(!showButtons);
    if (touchTimeOut !== null) {
      clearTimeout(touchTimeOut);
    }
    let time = setTimeout(() => {
      setShowButtons(false);
    }, 5000);
    // @ts-ignore
    setTouchTimeOut(time);
  };
  const pressOnX = () => {
    videoViewStore?.setFullScreenMode(false);
    videoViewStore?.setTimeOfTheMovie(timeOfTheMovie);
    videoViewStore?.setOpenVideoPlayer();
  };

  const start = () => {
    setDoesSeek(true);
    // @ts-ignores
    refVal?.current?.seek(videoViewStore?.timeOfTheMovie);
    videoViewStore?.setMovieOnPlay(true);
    setOnStart(true);
  };

  useEffect(() => {
    return function cleanup() {
      if (touchTimeOut !== null) {
        clearTimeout(touchTimeOut);
      }
    };
  }, [touchTimeOut]);
  const onPressOnPlay = () => {
    videoViewStore?.setMovieOnPlay(!videoViewStore?.movieOnPlay);
  };
  return (
    <View
      onResponderGrant={TouchTheScreen}
      onStartShouldSetResponder={() => {
        return true;
      }}
      style={styles.container}>
      <Video
        paused={!videoViewStore?.movieOnPlay}
        source={videoViewStore.videoObject.videoLink}
        style={[styles.video, styles.movie]}
        resizeMode={'contain'}
        onLoad={onLoad}
        onProgress={data => {
          if (!onStart) {
            start();
          }
          if (!doesSeek) {
            setTimeOfTheMovie(data.currentTime);
          }
        }}
        ref={refVal}
        onSeek={data => {
          setTimeOfTheMovie(data.currentTime);
          setDoesSeek(false);
        }}
      />
      {showButtons && timeOfTheMovie > 0 && (
        <View>
          <TouchableOpacity onPress={pressOnX} style={styles.x}>
            <Icon name="times" color={'white'} size={24} />
          </TouchableOpacity>
          <MultiSlider
            vertical
            containerStyle={styles.containerSlider}
            sliderLength={570}
            trackStyle={styles.track}
            markerStyle={styles.mark}
            selectedStyle={styles.selectedSlider}
            unselectedStyle={styles.unSelectedSlider}
            min={0}
            max={videoViewStore?.durationOfMovie}
            values={[videoViewStore?.durationOfMovie - timeOfTheMovie]}
            onValuesChange={data => {
              onSlide(videoViewStore?.durationOfMovie - data[0]);
            }}
          />

          <View style={[styles.downButtonsContainer, styles.movie]}>
            <Text style={styles.nameOfTheMovie}>
              {videoViewStore?.videoObject?.title}
            </Text>
            <Text style={styles.time}>
              {makeTime(parseInt(timeOfTheMovie.toFixed(0)))}/
              {makeTime(parseInt(videoViewStore?.durationOfMovie.toFixed(0)))}
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <TouchableOpacity onPress={moveBackward}>
              <Icon name="backward" color={'white'} size={60} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressOnPlay}
              style={styles.playAndPause}>
              {videoViewStore?.movieOnPlay === true ? (
                <Icon name="pause" color={'white'} size={80} />
              ) : (
                <Icon name="play" color={'white'} size={80} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={moveForward}>
              <Icon name="forward" color={'white'} size={60} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  unSelectedSlider: {backgroundColor: 'white'},
  selectedSlider: {backgroundColor: 'grey'},
  containerSlider: {
    position: 'absolute',
    right: 70,
    top: 310,
  },
  track: {
    height: 7,
    borderRadius: 10,
  },
  mark: {
    top: 3.5,
    backgroundColor: 'red',
    width: 15,
    height: 15,
  },
  movie: {position: 'absolute', transform: [{rotate: '90deg'}]},
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'red',
    zIndex: 1,
    elevation: 6,
  },
  middleContainer: {
    left: 20,
    top: 280,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '90deg'}],
    flexDirection: 'row',
  },
  backward: {
    top: 200,
    left: 175,
  },
  forward: {
    top: 500,
    left: 180,
  },
  exitFullScreen: {
    top: 600,
    left: 30,
    width: 16,
    height: 16,
  },
  time: {color: 'white', bottom: 30, left: 70},
  nameOfTheMovie: {color: 'white', marginRight: 20},
  playAndPause: {
    marginHorizontal: 100,
  },
  downButtonsContainer: {
    width: 500,
    right: 120,
    top: 290,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: 600,
    height: 20,
    borderRadius: 2,
    right: 20,
    top: 330,
  },
  video: {
    top: 0,
    right: -50,
    bottom: 0,
    left: -120,
    width: 660,
    backgroundColor: 'black',
  },
  x: {
    position: 'absolute',
    right: 30,
    top: 600,
    transform: [{rotate: '90deg'}],
    zIndex: 3,
  },
});
export default inject('videoViewStore')(observer(VideoFullScreen));
