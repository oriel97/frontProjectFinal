import {IBarberPageViewStore} from '../Interfaces/view-store.types';
import {action, makeObservable, observable} from 'mobx';
import React from 'react';
import type {IAboutBarber, IImage} from '../utils/utils';
import type {IBarber} from '../Interfaces/user';
import Api from '../api/apiRequests';

const initialData = {
  barberList: [],
  barberId: 0,
  barberName: '',
  barberLocation: {},
  barberInfo: {},
  barber: {},
  barberImageList: [],
};

class BarberPageViewStores implements IBarberPageViewStore {
  barberList = initialData.barberList;
  barberId = initialData.barberId;
  barberName = initialData.barberName;
  barberLocation = initialData.barberLocation;
  barberInfo = initialData.barberInfo;
  barber = initialData.barber;
  barberImageList = initialData.barberImageList;

  constructor(stores: any) {
    makeObservable(this, {
      barberList: observable,
      barberLocation: observable,
      barberImageList: observable,
      barberId: observable,
      barberName: observable,
      barberInfo: observable,
      setList: action.bound,
      setBarberId: action.bound,
      setBarberName: action.bound,
      setBarberLocation: action.bound,
      setBarberInfo: action.bound,
      setBarber: action.bound,
      setBarberImageList: action.bound,
      setFavorite: action.bound,
    });
  }

  setBarber(barber: IBarber) {
    this.barber = barber;
  }
  setBarberImageList(barberImageList: IImage[]) {
    this.barberImageList = barberImageList;
  }
  setBarberInfo(barberInfo: IAboutBarber) {
    this.barberInfo = barberInfo;
  }
  setBarberLocation(location: any) {
    this.barberLocation = location;
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
  setFavorite(favorit: boolean) {
    this.barber.favorite = favorit;
  }
}

export default BarberPageViewStores;
