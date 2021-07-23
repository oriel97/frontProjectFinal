import React from 'react';
import {Provider} from 'mobx-react';
import BarberPageViewStores from './view-stores/store';
import Main from './main';
import VideosViewStore from './view-stores/videoViewStore';

export default function App() {
  const barberPageViewStores = new BarberPageViewStores();
  const videoViewStore = new VideosViewStore();

  return (
    <Provider
      barberPageViewStores={barberPageViewStores}
      videoViewStore={videoViewStore}>
      <Main />
    </Provider>
  );
}
