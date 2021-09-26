import React from 'react';
import {HTTP} from '../utils/utils';
import type {IAppointment} from '../utils/utils';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    let base64 = require('base-64');
    const url = HTTP.login;
    const method = HTTP.post;
    const headers = {
      Authorization: 'Basic ' + base64.encode(username + ':' + password),
      Accept: HTTP.accept,
    };

    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, requestObject);

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

  static async getUserInfo(token: string) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/userInfo/' + token,
          requestObject,
        );
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

  static async getBarbersList(token: string) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/getCityBarbers',
          requestObject,
        );
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

  static async getNotification(token: string) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/notifications',
          requestObject,
        );
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
  static async giveGrade(
    userToken: string,
    barberToken: string,
    grade: number,
  ) {
    const method = HTTP.post;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': userToken,
    };
    const body = JSON.stringify({barber_public_id: barberToken, rate: grade});
    const requestObject = {method, headers, body};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/addRate',
          requestObject,
        );
        if (response.status === 200) {
          let user = response.json();
          resolve(user);
        } else if (response.status === 401) {
          reject(HTTP.serverProblemMessage);
        } else {
          reject(HTTP.serverProblemMessage);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static seenNotification(token: string, notificationId) {
    const method = HTTP.put;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress +
            '/seenNotification?notification_id=' +
            notificationId,
          requestObject,
        );
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

  static pressOnNotificationButton(token: string) {
    const method = HTTP.put;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/notificationsCounter?user_public_id=' + token,
          requestObject,
        );
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

  static async makeFollowOrUnfollow(userToken: string, barberToken: string) {
    const method = HTTP.post;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': userToken,
    };
    const body = JSON.stringify({barber_public_id: barberToken});
    const requestObject = {method, headers, body};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/addFavorite',
          requestObject,
        );
        if (response.status === 200) {
          let user = response.json();
          resolve(user);
        } else if (response.status === 401) {
          reject(HTTP.serverProblemMessage);
        } else {
          reject(HTTP.serverProblemMessage);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static async getBarberInformation(BarberId: number) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': BarberId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/getBarberInfo',
          requestObject,
        );
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

  static async getBarberImages(BarberId: number) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': BarberId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/barberImages',
          requestObject,
        );
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

  static async getUserImages(userId: number) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': userId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/userImage',
          requestObject,
        );
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

  static async addUserImage(userId: number, image: any, description: string) {
    const method = HTTP.post;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': userId,
    };
    const body = JSON.stringify({image: image, description: description});
    const requestObject = {method, headers, body};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/userImage',
          requestObject,
        );
        if (response.status === 200) {
          let user = response.json();
          resolve(user);
        } else if (response.status === 401) {
          reject(HTTP.serverProblemMessage);
        } else {
          reject(HTTP.serverProblemMessage);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static async getBarberHairStyleList(BarberId: number) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': BarberId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/getAllHairCut',
          requestObject,
        );
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

  static async getScheduleAppointment(customerId: number) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': customerId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/appointment',
          requestObject,
        );
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

  static async createAppointment(userId: string, appointment: IAppointment) {
    const method = HTTP.post;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      user_public_id: userId,
      barberId: appointment.barberId,
      day: appointment.date.day,
      month: appointment.date.month,
      year: appointment.date.year,
      time: appointment.time,
      amountOfTime: appointment.amountOfTime,
      type: appointment.type,
      price: appointment.price,
      gender: appointment.gender,
      barberName: appointment.barberName,
    });
    const requestObject = {method, headers, body};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/appointment',
          requestObject,
        );
        if (response.status === 200) {
          let user = response.json();
          resolve(user);
        } else if (response.status === 401) {
          reject(HTTP.serverProblemMessage);
        } else {
          reject(HTTP.serverProblemMessage);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this.functionWithTimeOut(3000, returnPromise);
  }

  static async deleteAppointment(appointmentId: number) {
    const method = HTTP.delete;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': appointmentId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress + '/appointment?appointment_id=' + appointmentId,
          requestObject,
        );
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

  static async getAppointmentTimeAccordingToDate(
    barberId: number,
    date: string,
    amountOfTime: number,
  ) {
    const method = HTTP.get;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': barberId,
    };
    const requestObject = {method, headers};
    const returnPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          HTTP.serverAddress +
            'getDayHours?date=' +
            date +
            '&amountOdTime=' +
            amountOfTime,
          requestObject,
        );
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
  /**
   * try to Create new user
   */
  static async createNewUser(body) {
    const method = HTTP.post;
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
