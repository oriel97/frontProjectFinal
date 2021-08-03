import {action, makeObservable, observable} from 'mobx';
import type {IAppointmentViewStore, IHairStyle} from '../utils/utils';

const initialData = {
  maleHairStyleList: [],
  femaleHairStyleList: [],
  selectedHairStyleList: [],
};

class AppointmentViewStore implements IAppointmentViewStore {
  maleHairStyleList = initialData.maleHairStyleList;
  femaleHairStyleList = initialData.femaleHairStyleList;
  selectedHairStyleList = initialData.selectedHairStyleList;
  constructor() {
    makeObservable(this, {
      maleHairStyleList: observable,
      femaleHairStyleList: observable,
      selectedHairStyleList: observable,
      setMaleHairStyleList: action.bound,
      setFemaleHairStyleList: action.bound,
      setSelectedHairStyleList: action.bound,
    });
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
