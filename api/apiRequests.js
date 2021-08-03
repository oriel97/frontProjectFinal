import React from 'react';
import {HTTP} from '../utils/utils';
import {
  BarberHairAppointmentPossibleDates,
  BarberHairAppointmentPossibleHoursForSpecificDate,
  BarberHairCutTypes,
  barberList,
  BarbersInformation,
} from '../mocks/barberMock';

export default class Api extends React.Component {
  static functionWithTimeOut(
    ms,
    promise,
    message = HTTP.connectProblemMessage,
  ) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(message);
      }, ms);
      promise
        .then(value => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch(reason => {
          clearTimeout(timer);
          reject(reason);
        });
    });
  }

  /**
   * try to login
   * @param {*} username
   * @param {*} password
   */
  static async Login(username, password) {
    return {
      token: 100,
    };
    // let base64 = require('base-64');
    // const url = HTTP.login;
    // const method = HTTP.post;
    // const headers = {
    //   Authorization: 'Basic ' + base64.encode(username + ':' + password),
    //   Accept: HTTP.accept,
    // };
    //
    // const requestObject = {method, headers};
    // const returnPromise = new Promise(async (resolve, reject) => {
    //   try {
    //     const response = await fetch(url, requestObject);
    //
    //     if (response.status === 200) {
    //       let user = response.json();
    //       resolve(user);
    //     } else if (response.status === 401) {
    //       reject(HTTP.loginProblemMessage);
    //     } else {
    //       reject(HTTP.serverProblemMessage);
    //     }
    //   } catch (e) {
    //     reject(e);
    //   }
    // });
    // return this.functionWithTimeOut(3000, returnPromise);
  }

  static async getUserInfo() {
    return {
      name: 'oriel',
      email: 'oriel97@gmail.com',
      city: 'Netanya',
      gender: 'Male',
    };
  }

  static async getBarbersList() {
    return barberList;
  }

  static async getBarberInformation(BarberId: number) {
    return BarbersInformation[BarberId];
  }
  static async getBarberHairStyleList(BarberId: number) {
    return BarberHairCutTypes[BarberId];
  }
  static async getMaxAndMinDates(BarberId: number) {
    return BarberHairAppointmentPossibleDates[BarberId];
  }

  static async getAppointmentTimeAccordingToDate(
    BarberId: number,
    date: string,
  ) {
    return BarberHairAppointmentPossibleHoursForSpecificDate[BarberId];
  }
  /**
   * try to Create new user
   */
  static async createNewUser(body) {
    const method = HTTP.put;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestObject = {method, headers, body};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(HTTP.createNewUser, requestObject);

        if (response.status === 200) {
          let user = response.json();
          resolve(user);
        } else if (response.status === 401) {
          reject(HTTP.loginProblemMessage);
        } else {
          reject(HTTP.serverProblemMessage);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }
}
