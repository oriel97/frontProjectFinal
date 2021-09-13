import {action, makeObservable, observable} from 'mobx';
import type {IAppointmentViewStore, IHairStyle, ITypes} from '../utils/utils';
import {IAppointment, IDate} from '../utils/utils';

const initialData = {
  maleHairStyleList: [],
  femaleHairStyleList: [],
  selectedHairStyleList: [],
  amountOfTime: 0,
  price: 0,
  date: {},
  minDate: {},
  maxDate: {},
  appointment: {},
  timeList: [],
  typeOfHairAppointment: {},
  pastAppointmentList: [],
  futureAppointmentList: [],
};

class AppointmentViewStore implements IAppointmentViewStore {
  maleHairStyleList = initialData.maleHairStyleList;
  femaleHairStyleList = initialData.femaleHairStyleList;
  selectedHairStyleList = initialData.selectedHairStyleList;
  amountOfTime = initialData.amountOfTime;
  price = initialData.price;
  date = initialData.date;
  minDate = initialData.minDate;
  maxDate = initialData.maxDate;
  appointment = initialData.appointment;
  timeList = initialData.timeList;
  typeOfHairAppointment = initialData.typeOfHairAppointment;
  pastAppointmentList = initialData.pastAppointmentList;
  futureAppointmentList = initialData.futureAppointmentList;
  constructor() {
    makeObservable(this, {
      maleHairStyleList: observable,
      femaleHairStyleList: observable,
      selectedHairStyleList: observable,
      amountOfTime: observable,
      price: observable,
      date: observable,
      minDate: observable,
      maxDate: observable,
      appointment: observable,
      timeList: observable,
      typeOfHairAppointment: observable,
      pastAppointmentList: observable,
      futureAppointmentList: observable,
      setAppointmentList: action.bound,
      setMaleHairStyleList: action.bound,
      setFemaleHairStyleList: action.bound,
      setSelectedHairStyleList: action.bound,
      setAmountOfTime: action.bound,
      setPrice: action.bound,
      setDate: action.bound,
      setMaxAndMinDate: action.bound,
      setAppointment: action.bound,
      setTimeList: action.bound,
      setTypeOfHairAppointment: action.bound,
    });
  }

  setAppointmentList(list: IAppointment[]) {
    this.pastAppointmentList = list.past;
    this.futureAppointmentList = list.future;
  }

  setTypeOfHairAppointment(hairAppointmentType: ITypes) {
    this.typeOfHairAppointment = hairAppointmentType;
  }
  setDate(date: IDate) {
    this.date = date;
  }
  setMaxAndMinDate(maxAndMinObj: any) {
    this.minDate = maxAndMinObj.minDate;
    this.maxDate = maxAndMinObj.maxDate;
  }
  setAppointment(appointment: IAppointment) {
    this.appointment = appointment;
  }
  setTimeList(timeList: string[]) {
    this.timeList = timeList;
  }

  setPrice(price: number) {
    this.price = price;
  }
  setAmountOfTime(time: number) {
    this.amountOfTime = time;
  }

  setSelectedHairStyleList(selectedHairStyleList) {
    this.selectedHairStyleList = selectedHairStyleList;
  }
  setFemaleHairStyleList(femaleHairStyleList: IHairStyle) {
    this.femaleHairStyleList = femaleHairStyleList;
  }
  setMaleHairStyleList(maleHairStyleList: IHairStyle) {
    this.maleHairStyleList = maleHairStyleList;
  }
}

export default AppointmentViewStore;
