import React from 'react';
import {Provider} from 'mobx-react';
import BarberPageViewStores from './view-stores/store';
import Main from './main';
import VideosViewStore from './view-stores/videoViewStore';
import AppointmentViewStore from './view-stores/appointmentViewStore';

export default function App() {
  const barberPageViewStores = new BarberPageViewStores();
  const videoViewStore = new VideosViewStore();
  const appointmentViewStore = new AppointmentViewStore();

  return (
    <Provider
      barberPageViewStores={barberPageViewStores}
      videoViewStore={videoViewStore}
      appointmentViewStore={appointmentViewStore}>
      <Main />
    </Provider>
  );
}
