import React, {FunctionComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {citiesName} from '../utils/cities';
import Card from './card';
import {Colors} from '../utils/color';

interface Iprops {
  cityName: string;
  pressOnCity: any;
  disableScroll: any;
}

const ChooseList: FunctionComponent<Iprops> = ({
  cityName,
  pressOnCity,
  disableScroll,
}) => {
  const [openButton, setOpenButton] = useState(false);
  const openButtonHandler = () => {
    disableScroll();
    setOpenButton(!openButton);
  };
  return (
    <React.Fragment>
      <View style={styles.LocationButtonContainer}>
        <View>
          <Text style={styles.textContainer}>Location:</Text>
        </View>
        <TouchableOpacity
          onPress={openButtonHandler}
          style={[styles.button, {width: '60%'}]}>
          <Text style={{color: Colors.white, fontWeight: 'bold'}}>
            {cityName}
          </Text>
        </TouchableOpacity>
      </View>
      {openButton && (
        <SafeAreaView style={styles.cardContainer}>
          <Card style={{width: 300, height: 300, alignItems: 'center'}}>
            <FlatList
              nestedScrollEnabled={true}
              style={{width: '100%'}}
              keyExtractor={item => item}
              data={citiesName}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      openButtonHandler();
                      pressOnCity(item);
                    }}
                    style={{padding: 3}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                </View>
              )}
            />
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={openButtonHandler}
                style={styles.button}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </SafeAreaView>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    paddingTop: '100%',
    zIndex: 9999999,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: Colors.lightGrey,
    width: '100%',
    height: 1,
  },
  inputContainer: {
    marginBottom: 20,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 7,
    fontSize: 17,
    fontWeight: 'bold',
  },
  LocationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
    marginTop: 20,
  },
});

export default ChooseList;
