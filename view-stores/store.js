import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, computed, makeObservable, observable} from 'mobx';
import React from 'react';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
};

class BarberPageViewStores implements IBarberPageViewStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;

  constructor(stores: any) {
    makeObservable(this, {
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
  setLogin(userName: string, userId: string) {
    this.userId = userId;
    this.userName = userName;
  }
}
export default BarberPageViewStores;
