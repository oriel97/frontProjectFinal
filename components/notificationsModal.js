import React, {FunctionComponent, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {IUserStore} from '../Interfaces/view-store.types';
import {inject, observer} from 'mobx-react';
import {Colors} from '../utils/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type {INotifications} from '../utils/utils';
import {Avatar} from 'react-native-elements';
import Api from '../api/apiRequests';

interface IProps {
  userStore?: IUserStore;
  onPressedX: any;
}

const NotificationsModal: FunctionComponent<IProps> = ({
  userStore,
  onPressedX,
}) => {
  const [notificationsSide, setNotificationsSide] = useState(false);
  const [chosenNotification, setChosenNotification] = useState();

  const fromTimeToBeforeTime = (date: string, time: string) => {
    const messageDate = new Date(date + 'T' + time);
    messageDate.setHours(messageDate.getHours() - 3);
    const nowDate = new Date();
    const differentOfTime = timeDiffCalc(nowDate, messageDate);
    return differentOfTime['days'] !== null
      ? differentOfTime['days'] + ' days ago'
      : differentOfTime['hours'] !== null
      ? differentOfTime['hours'] + ' hours ago'
      : differentOfTime['minutes'] + ' minutes ago';
  };

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

    let difference = {};
    days > 0 ? (difference['days'] = days) : (difference['days'] = null);
    hours > 0 ? (difference['hours'] = hours) : (difference['hours'] = null);
    minutes > 0
      ? (difference['minutes'] = minutes)
      : (difference['minutes'] = null);
    return difference;
  }

  const onPressOnNotification = (notification: INotifications) => {
    userStore.setNotificationSeen(notification.id);
    Api.seenNotification(userStore.userId, notification.id);
    setNotificationsSide(true);
    setChosenNotification(notification);
  };

  const notification = (notification: INotifications) => {
    return (
      <TouchableOpacity onPress={() => onPressOnNotification(notification)}>
        <View
          style={[
            styles.notificationContainer,
            {
              backgroundColor: notification.wasRead
                ? Colors.white
                : Colors.facebookBlue,
            },
          ]}>
          <Avatar
            rounded
            source={{uri: notification.barberAvatar}}
            size={100}
            avatarStyle={{margin: 10}}
          />
          <View
            style={{
              marginLeft: 10,
              marginVertical: 10,
              marginRight: 10,
              width: '70%',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {notification.shortHeader + ' - ' + notification.barberName}
            </Text>
            <Text style={{fontSize: 14}}>{notification.shortMessage}</Text>
            <Text style={{color: Colors.grey, fontSize: 12}}>
              {fromTimeToBeforeTime(notification.date, notification.time)}
            </Text>
          </View>
        </View>
        <View
          style={{height: 2, width: '100%', backgroundColor: Colors.grey}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressedX}>
          <Icon
            name="times"
            color={Colors.black}
            size={24}
            style={{margin: 15}}
          />
        </TouchableOpacity>
        {notificationsSide && (
          <TouchableOpacity onPress={() => setNotificationsSide(false)}>
            <Icon
              name="arrow-left"
              color={Colors.black}
              size={24}
              style={{marginLeft: 260, marginTop: 15}}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>
        Notifications
      </Text>
      <View
        style={{
          marginTop: 3,
          width: '80%',
          height: 2,
          backgroundColor: Colors.black,
          alignSelf: 'center',
        }}
      />
      {!notificationsSide ? (
        <FlatList
          keyExtractor={(item, index) => index}
          data={userStore.notifications}
          renderItem={({item}) => <View>{notification(item)}</View>}
        />
      ) : (
        <ScrollView>
          <Text
            style={{
              marginVertical: 20,
              fontSize: 24,
              fontWeight: 'bold',
              color: Colors.lightBlue,
              textAlign: 'center',
            }}>
            {chosenNotification.header}
          </Text>
          <View style={{marginHorizontal: 20}}>
            <Text style={{marginBottom: 10}}>{chosenNotification.message}</Text>
            <View>
              <Text>hoping to see you soon</Text>
              <Text style={{fontWeight: 'bold'}}>
                {chosenNotification.barberName}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  notificationContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'white',
    width: 350,
    height: 450,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 10,
    alignSelf: 'center',
    top: 100,
  },
});
export default inject('userStore')(observer(NotificationsModal));
