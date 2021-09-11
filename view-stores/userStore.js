import {action, makeObservable, observable} from 'mobx';
import type {IImage} from '../utils/utils';
import {IUserStore} from '../Interfaces/view-store.types';
import Api from '../api/apiRequests';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
  userImages: [],
  notifications: [],
  unseenNotification: 0,
};

class UserStore implements IUserStore {
  unseenNotification = initialData.unseenNotification;
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;
  userImages = initialData.userImages;
  notifications = initialData.notifications;
  constructor() {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      userId: observable,
      userImages: observable,
      notifications: observable,
      unseenNotification: observable,
      setUserId: action.bound,
      setUserName: action.bound,
      setLogin: action.bound,
      setUserImages: action.bound,
      addImageToImageList: action.bound,
      setNotifications: action.bound,
      setNotificationSeen: action.bound,
      setNotificationPressed: action.bound,
    });
  }

  setNotificationPressed(numOfNotification: number) {
    this.unseenNotification = numOfNotification;
  }

  setNotificationSeen(id: number) {
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].id === id) {
        this.notifications[i].wasRead = true;
      }
    }
  }

  async setNotifications(token: string) {
    const notification = await Api.getNotification(token)
      .then()
      .catch(error => error);
    if (notification) {
      if (
        !!notification.notifications &&
        notification.notifications.length > 0
      ) {
        this.notifications = notification.notifications;
      } else {
        this.notifications = [];
      }
      if (
        !!notification.unseenNotification &&
        notification.unseenNotification > 0
      ) {
        this.setNotificationPressed(notification.unseenNotification);
      } else {
        this.setNotificationPressed(0);
      }
    }
  }

  addImageToImageList(image: IImage) {
    this.userImages.unshift(image);
  }
  setUserImages(userImages: IImage[]) {
    this.userImages = userImages;
  }
  setUserId(userId: string) {
    this.userId = userId;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

  setLogin(
    userName: string,
    userId: string,
    userGender: string,
    userEmail: string,
    userCity: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userGender = userGender;
    this.userEmail = userEmail;
    this.userCity = userCity;
  }
}

export default UserStore;
