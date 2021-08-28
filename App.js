import React from 'react';
import {Provider} from 'mobx-react';
import BarberPageViewStores from './view-stores/store';
import Main from './main';
import VideosViewStore from './view-stores/videoViewStore';
import AppointmentViewStore from './view-stores/appointmentViewStore';
import UserStore from './view-stores/userStore';

export default function App() {
  const barberPageViewStores = new BarberPageViewStores();
  const videoViewStore = new VideosViewStore();
  const appointmentViewStore = new AppointmentViewStore();
  const userStore = new UserStore();

  return (
    <Provider
      barberPageViewStores={barberPageViewStores}
      videoViewStore={videoViewStore}
      appointmentViewStore={appointmentViewStore}
      userStore={userStore}>
      <Main />
    </Provider>
  );
}
