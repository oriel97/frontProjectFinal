import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, computed, makeObservable, observable} from 'mobx';
import React from 'react';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
};

class BarberPageViewStores implements IBarberPageViewStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;

  constructor(stores: any) {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      userId: observable,
      setUserId: action.bound,
      setUserName: action.bound,
      setLogin: action.bound,
    });
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

export default BarberPageViewStores;
