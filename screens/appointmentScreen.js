import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {FunctionComponent} from 'react';

import type {IAppointment, IAppointmentViewStore, IDate} from '../utils/utils';
import {IBarberPageViewStore} from '../Interfaces/view-store.types';

import Header from '../components/header';
import Api from '../api/apiRequests';
import {Colors} from '../utils/color';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {inject, observer} from 'mobx-react';
import map from 'lodash/map';
import filter from 'lodash/filter';

interface IProps {
  barberPageViewStores?: IBarberPageViewStore;
  appointmentViewStore?: IAppointmentViewStore;
  navigation: any;
}

const AppointmentScreen: FunctionComponent<IProps> = ({
  barberPageViewStores,
  appointmentViewStore,
  navigation,
}) => {
  const [haveAppointments, setHaveAppointments] = useState(true);
  const [openAppointmentCard, setOpenAppointmentCard] = useState('');
  const [appointment: IAppointment, setAppointment] = useState();
  const [loading, setLoading] = useState(false);

  const openDrawer = () => {
    setOpenAppointmentCard(false);
    setHaveAppointments(true);
    setAppointment();
    setLoading(false);
    navigation.openDrawer();
  };
  const onPressOnBackArrow = () => {
    setOpenAppointmentCard(false);
    setHaveAppointments(true);
    setAppointment();
    setLoading(false);
    navigation.navigate('BarberScreen');
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backAction = () => {
    setOpenAppointmentCard(false);
    setHaveAppointments(true);
    setAppointment();
    setLoading(false);
    navigation.navigate('BarberScreen');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      const starter = async () => {
        try {
          const lists = await Api.getScheduleAppointment();
          appointmentViewStore.setAppointmentList(lists);
          if (lists?.past?.length === 0 && lists?.future?.length === 0) {
            setHaveAppointments(false);
          }
        } catch (e) {}
      };

      starter();
    });
  });

  const dateToString = (date: IDate) => {
    const day = date?.day < 10 ? '0' + date?.day : date?.day;
    const month = date?.month < 10 ? '0' + date?.month : date?.month;
    return day + '/' + month + '/' + date?.year;
  };

  const onPressIconPast = (appointment1: IAppointment) => {
    setOpenAppointmentCard('past');
    setAppointment(appointment1);
  };
  const onPressIconFuture = (appointment1: IAppointment) => {
    setOpenAppointmentCard('future');
    setAppointment(appointment1);
  };

  const linePast = (appointment1: IAppointment, index: number) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          {dateToString(appointment1.date) +
            ' ' +
            appointment1.time +
            ' - ' +
            appointment1.barberName}
        </Text>
        <TouchableOpacity onPress={() => onPressIconPast(appointment1)}>
          <Icon name={'plus-circle'} color={Colors.green} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const lineFuture = (appointment1: IAppointment, index: number) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          {dateToString(appointment1?.date) +
            ' ' +
            appointment1?.time +
            ' - ' +
            appointment1?.barberName}
        </Text>
        <TouchableOpacity onPress={() => onPressIconFuture(appointment1)}>
          <Icon name={'plus-circle'} color={Colors.green} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const closeCard = () => {
    setOpenAppointmentCard(false);
  };

  const deleteAppointment = async () => {
    setLoading(true);
    await Api.deleteAppointment(appointment.appointmentId);
    let futureList = appointmentViewStore.futureAppointmentList;
    console.log(appointment);
    futureList = filter(futureList, appointment1 => {
      return appointment1.appointmentId !== appointment.appointmentId;
    });
    appointmentViewStore.setAppointmentList({
      past: appointmentViewStore.pastAppointmentList,
      future: futureList,
    });
    setLoading(false);
    setOpenAppointmentCard(false);
  };

  return (
    <View>
      <Header headerName={'Appointment screen'} openDrawerFunc={openDrawer} />
      <TouchableOpacity onPress={onPressOnBackArrow} style={styles.backIcon}>
        <Icon name="chevron-left" color={Colors.black} size={36} />
      </TouchableOpacity>
      <View>
        <View>
          <Text
            style={[
              styles.headline,
              {textAlign: 'center', marginLeft: 0, color: Colors.red},
            ]}>
            Watch all your schedule appointment:
          </Text>
        </View>
        {haveAppointments ? (
          <View>
            <View>
              <Text style={styles.headlinePastAndFeature}>Past:</Text>
            </View>
            <View style={styles.container}>
              <View
                style={[
                  styles.appointmentContainer,
                  openAppointmentCard !== 'past' &&
                    openAppointmentCard !== 'future' && {elevation: 8},
                ]}>
                <ScrollView>
                  {map(appointmentViewStore.pastAppointmentList, linePast)}
                </ScrollView>
              </View>
            </View>
            <View>
              <Text style={styles.headlinePastAndFeature}>Future:</Text>
            </View>
            <View style={styles.container}>
              <View
                style={[
                  styles.appointmentContainer,
                  openAppointmentCard !== 'past' &&
                    openAppointmentCard !== 'future' && {elevation: 8},
                ]}>
                <ScrollView>
                  {map(appointmentViewStore.futureAppointmentList, lineFuture)}
                </ScrollView>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.noAppointments}>
              {'There is no appointments that have been scheduled!'}
            </Text>
          </View>
        )}
        {(openAppointmentCard === 'past' ||
          openAppointmentCard === 'future') && (
          <View style={styles.cardBackground}>
            <View style={styles.card}>
              <TouchableOpacity onPress={closeCard}>
                <Icon name={'times'} color={Colors.black} size={20} />
              </TouchableOpacity>
              <Text style={styles.cardHeadline}>The appointment details:</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.subHeadline,
                    openAppointmentCard === 'past' && {marginBottom: 30},
                  ]}>
                  Barber name:
                </Text>
                <Text style={styles.cardText}>{appointment?.barberName}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.subHeadline,
                    openAppointmentCard === 'past' && {marginBottom: 30},
                  ]}>
                  Appointment time:
                </Text>
                <Text style={styles.cardText}>
                  {dateToString(appointment?.date)}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.subHeadline,
                    openAppointmentCard === 'past' && {marginBottom: 30},
                  ]}>
                  Appointment hour:
                </Text>
                <Text style={styles.cardText}>{appointment?.time}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.subHeadline,
                    openAppointmentCard === 'past' && {marginBottom: 30},
                  ]}>
                  Appointment type:
                </Text>
                <ScrollView horizontal={true}>
                  {map(appointment?.type, (type, index) => {
                    return (
                      <View key={index}>
                        {index === appointment.type.length - 1 ? (
                          <Text style={styles.cardText}>{type}</Text>
                        ) : (
                          <Text style={styles.cardText}>{type + ', '}</Text>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.subHeadline,
                    openAppointmentCard === 'past' && {marginBottom: 30},
                  ]}>
                  Price
                </Text>
                <Text style={styles.cardText}>
                  {appointment?.price + ' Shekel'}
                </Text>
              </View>
              <View>
                {openAppointmentCard === 'future' && !loading ? (
                  <TouchableOpacity onPress={deleteAppointment}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                ) : (
                  openAppointmentCard === 'future' && (
                    <ActivityIndicator
                      color={Colors.black}
                      size={'large'}
                      style={styles.loading}
                    />
                  )
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  noAppointments: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.darkBlue,
    marginHorizontal: 20,
    top: 150,
  },
  loading: {justifyContent: 'center', marginTop: 20},
  deleteText: {
    textAlign: 'center',
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  subHeadline: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    color: Colors.darkBlue,
    marginBottom: 15,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  cardHeadline: {
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle: 'italic',
    color: Colors.red,
    textAlign: 'center',
    marginBottom: 30,
  },
  backIcon: {position: 'absolute', right: 20, top: 20},
  cardBackground: {
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
    width: 350,
    height: 450,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 10000,
  },
  headlinePastAndFeature: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
    color: Colors.lightBlue,
    textDecorationLine: 'underline',
  },
  headline: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 0,
    color: Colors.red,
  },
  appointmentContainer: {
    width: 380,
    height: 170,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    padding: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default inject(
  'barberPageViewStores',
  'appointmentViewStore',
)(observer(AppointmentScreen));
