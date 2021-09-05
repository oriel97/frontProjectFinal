import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import Card from './card';
import {IBarber} from '../Interfaces/user';
import {imageBase64} from '../utils/imageUtils';

interface IProps {
  barber: IBarber;
}

const Barber: FunctionComponent<IProps> = ({barber}) => {
  return (
    <View style={styles.barberCardGeneral}>
      <Card style={styles.barberCardSize}>
        <View>
          <Avatar rounded source={{uri: barber.picture}} size="xlarge" />
          <View style={styles.barberName}>
            <Text style={styles.barberNameText}>{barber.barberName}</Text>
          </View>
          <View style={styles.barberLocation}>
            <Text style={styles.barberLocationText}>{barber.location}</Text>
          </View>
        </View>
        <View style={styles.generalHead}>
          <Text style={styles.generalHeadText}>Followers:</Text>
          <Text style={styles.responseSize}>{barber.followers}</Text>
        </View>
        <View style={styles.generalHead}>
          <Text style={styles.generalHeadText}>Average Rate:</Text>
          <Text style={styles.responseSize}>{barber.grade}/5</Text>
        </View>
        <View style={styles.barberSentence}>
          <Text style={styles.sentenceHeadline}>{barber.summary.headline}</Text>
          <Text style={styles.sentence}>{barber?.summary?.sentence}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  responseSize: {fontSize: 25},
  generalHead: {flexDirection: 'row', marginTop: 30},
  generalHeadText: {fontWeight: 'bold', fontSize: 25, marginRight: 10},
  barberLocation: {
    position: 'absolute',
    top: 90,
    left: 160,
    width: 150,
  },
  barberLocationText: {
    textAlign: 'center',
    fontSize: 25,
  },
  barberName: {
    position: 'absolute',
    left: 160,
    width: 150,
  },
  barberNameText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
  },
  barberCardGeneral: {alignItems: 'center', marginBottom: 30},
  barberCardSize: {width: 350, height: 440},
  barberSentence: {
    backgroundColor: 'orange',
    height: 100,
    position: 'absolute',
    width: 350,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sentenceHeadline: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sentence: {
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Barber;
