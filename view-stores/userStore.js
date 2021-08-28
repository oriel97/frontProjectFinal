import {IVideosViewStore} from 'typescript/view-store.types';
import {action, makeObservable, observable} from 'mobx';

const initialData = {
  userName: '',
  userId: '',
  userEmail: '',
  userCity: '',
  userGender: '',
  userImages: [],
};

class UserStore {
  userName = initialData.userName;
  userId = initialData.userId;
  userEmail = initialData.userEmail;
  userCity = initialData.userCity;
  userGender = initialData.userGender;
  userImages = initialData.userImages;
  constructor() {
    makeObservable(this, {
      userGender: observable,
      userEmail: observable,
      userCity: observable,
      userName: observable,
      userId: observable,
      userImages: observable,
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

export default UserStore;
