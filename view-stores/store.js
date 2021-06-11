import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, computed, makeObservable, observable} from 'mobx';
import React from 'react';
import Api from '../api/apiRequests';
import {barberList} from '../mocks/barberMock';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
  barberList: [],
};

class BarberPageViewStores implements IBarberPageViewStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;
  barberList = initialData.barberList;

  constructor(stores: any) {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      barberList: observable,
      userId: observable,
      setUserId: action.bound,
      setUserName: action.bound,
      setLogin: action.bound,
    });
  }

  async setBarberList() {
    try {
      if (this.barberList.length === 0) {
        this.barberList = await Api.getBarbersList();
      }
    } catch (e) {}
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
