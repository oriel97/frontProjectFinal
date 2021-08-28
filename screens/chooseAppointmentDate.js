import React, {FunctionComponent, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ActivityIndicator,
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
import type {IAppointmentViewStore} from '../utils/utils';

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

  const [date, setDate] = useState(new Date(2021, 7, 1));
  const [show, setShow] = useState(true);
  const [timeList, setTimeList] = useState([]);
  const [chosenTime, setChosenTime] = useState('');
  const [madeAppointment, setMadeAppointment] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = async (event, selectedDate: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShow(false);
      try {
        const tempList = await Api.getAppointmentTimeAccordingToDate(
          barberPageViewStores.barberId,
          selectedDate,
          appointmentViewStore.amountOfTime,
        )
          .then()
          .catch(e => {});
        if (tempList !== null) {
          setTimeList(tempList);
        }
      } catch (e) {}
    }
  };

  const makeTheAppointment = async () => {
    if (!!date && chosenTime !== '') {
      appointmentViewStore.setAppointment({
        date: date,
        time: chosenTime,
        type: appointmentViewStore.typeOfHairAppointment.type,
        price: appointmentViewStore.price,
        amountOfTime: appointmentViewStore.amountOfTime,
        gender: appointmentViewStore.typeOfHairAppointment.gender,
        barberName: barberPageViewStores.barberName,
        barberId: barberPageViewStores.barberId,
      });
      setMadeAppointment(true);
      setLoading(true);
      await Api.createAppointment(
        barberPageViewStores.barberId,
        appointmentViewStore.appointment,
      );
      setLoading(false);
    }
  };
  const onPressFinishMakingAppointment = () => {
    navigation.navigate('AppointmentScreen');
  };

  const onChosenDate = (time: string) => {
    setChosenTime(time);
  };
  const listOfAllTimes = (time: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onChosenDate(time);
        }}
        style={[
          styles.time,
          chosenTime === time
            ? {backgroundColor: Colors.red}
            : {backgroundColor: Colors.lightGreen},
        ]}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {date?.getDate() +
            '-' +
            date?.getMonth() +
            '-' +
            date?.getFullYear() +
            '   ' +
            time}
        </Text>
      </TouchableOpacity>
    );
  };

  const appointmentTypeToString = () => {
    let arr = appointmentViewStore?.appointment?.type;

    let str = '';
    for (let i = 0; i < arr?.length; i++) {
      str = str + arr[i].name;
      if (i + 1 < arr.length) {
        str = str + ', ';
      }
    }
    console.log(str);
    return str;
  };
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      console.log(new Date().getDate() + 14);
      const starter = () => {};
      setDate(new Date(2021, 7, 1));
      setShow(true);
      setTimeList([]);
      setChosenTime('');
      setMadeAppointment(false);
      setLoading(false);
      starter();
    });
  });

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
        {!show && timeList?.length > 0 && map(timeList, listOfAllTimes)}
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
            setChosenTime('');
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
            minimumDate={new Date()}
            maximumDate={new Date().addDays(14)}
          />
        )}
      </View>
      {madeAppointment && <View style={styles.disabled} />}
      {!!barberPageViewStores.barberName &&
        !!appointmentViewStore?.appointment?.type &&
        !!appointmentViewStore?.appointment?.type &&
        madeAppointment && (
          <View style={styles.finalBackground}>
            <View style={styles.card}>
              <Text style={styles.great}>{'Great!'}</Text>
              <Text style={styles.secondHeader}>
                {'your appointment that you scheduled is for:'}
              </Text>
              <Text style={styles.detailsText}>
                {barberPageViewStores.barberName +
                  ' on ' +
                  date?.getDate() +
                  '-' +
                  date?.getMonth() +
                  '-' +
                  date?.getFullYear() +
                  ' at ' +
                  appointmentViewStore.appointment.time +
                  ' for:\n' +
                  appointmentTypeToString()}
              </Text>
              <View style={styles.icon}>
                {!loading ? (
                  <Icon
                    name={'check-circle'}
                    color={Colors.lightGreen}
                    size={100}
                  />
                ) : (
                  <ActivityIndicator
                    color={Colors.black}
                    size={'large'}
                    style={{justifyContent: 'center'}}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={onPressFinishMakingAppointment}
                style={styles.backButton}>
                <Text style={styles.backText}>Go to appointment page</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
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
  great: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.darkBlue,
  },
  secondHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.darkBlue,
  },
  detailsText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.red,
  },
  card: {
    position: 'absolute',
    width: 300,
    height: 450,
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
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: Colors.lightBlue,
    width: 250,
    height: 60,
    marginHorizontal: 8,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  time: {
    width: 350,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,

    zIndex: 2,
    marginHorizontal: 30,
    marginVertical: 15,
  },
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
});
export default inject(
  'barberPageViewStores',
  'appointmentViewStore',
)(observer(ChooseAppointmentScreen));
