import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, computed, makeObservable, observable} from 'mobx';
import React from 'react';

const initialData = {
  userName: '',
  userId: '',
};

class BarberPageViewStores implements IBarberPageViewStore {
  userName = initialData.userName;
  userId = initialData.userId;

  constructor(stores: any) {
    makeObservable(this, {
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
    this.setUserId(userId);
    this.setUserName(userName);
  }
}
export default BarberPageViewStores;
