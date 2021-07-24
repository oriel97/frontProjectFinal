import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, makeObservable, observable} from 'mobx';
import React from 'react';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
  barberList: [],
  barberId: 0,
  barberName: '',
};

class BarberPageViewStores implements IBarberPageViewStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;
  barberList = initialData.barberList;
  barberId = initialData.barberId;
  barberName = initialData.barberName;

  constructor(stores: any) {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      barberList: observable,
      barberId: observable,
      userId: observable,
      barberName: observable,
      setUserId: action.bound,
      setUserName: action.bound,
      setLogin: action.bound,
      setList: action.bound,
      setBarberId: action.bound,
      setBarberName: action.bound,
    });
  }
  setBarberName(name: string) {
    this.barberName = name;
  }

  setBarberId(id: number) {
    this.barberId = id;
  }
  setList(list: any) {
    this.barberList = list;
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
