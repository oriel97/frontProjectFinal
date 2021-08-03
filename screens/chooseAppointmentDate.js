import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/color';
import map from 'lodash/map';
import Api from '../api/apiRequests';
import type {IAppointmentViewStore, IHairStyle} from '../utils/utils';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  appointmentViewStore?: IAppointmentViewStore;
  navigation: any;
}
const ChooseAppointmentScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  navigation,
  appointmentViewStore,
}) => {
  const onPressOnBackArrow = () => {
    navigation.goBack();
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(date);
    setShow(false);
  };
  useEffect(() => {
    const starter = async () => {
      const minAndMaxDateObj = await Api.getMaxAndMinDates(
        barberPageViewStores.barberId,
      );
      appointmentViewStore.setMaxAndMinDate(minAndMaxDateObj);
      setMaxDate(
        new Date(
          minAndMaxDateObj.maxDate.year,
          minAndMaxDateObj.maxDate.month,
          minAndMaxDateObj.maxDate.day,
        ),
      );
      setMinDate(
        new Date(
          minAndMaxDateObj.minDate.year,
          minAndMaxDateObj.minDate.month,
          minAndMaxDateObj.minDate.day,
        ),
      );
    };
    starter().catch(e => {
      console.log(e);
    });
  });

  const makeTheAppointment = () => {};

  const TimesList = () => {};

  return (
    <View style={{height: '100%'}}>
      <Header
        headerName={'Choose date screen'}
        openDrawerFunc={() => {}}
        headerIcon={false}
      />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Text style={styles.headLineText}>
          {'Choose the time\n for your appointment:'}
        </Text>
      </View>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}} />
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={makeTheAppointment}>
          <View
            style={[styles.buttonInside, {backgroundColor: Colors.limeGreen}]}>
            <Text style={styles.buttonText}>Make the appointment!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setShow(!show);
            console.log(appointmentViewStore.maxDate);
            console.log(appointmentViewStore.minDate);
          }}>
          <View style={styles.buttonInside}>
            <Text style={styles.buttonText}>Choose other day</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={onChange}
            minimumDate={new Date(minDate.year, minDate.month, minDate.day)}
            maximumDate={new Date(maxDate.year, maxDate.month, maxDate.day)}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headLineText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    color: Colors.darkBlue,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonInside: {
    backgroundColor: Colors.lightBlue,
    width: 170,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {fontWeight: 'bold', textAlign: 'center', fontSize: 20},
});
export default inject(
  'barberPageViewStores',
  'appointmentViewStore',
)(observer(ChooseAppointmentScreen));
