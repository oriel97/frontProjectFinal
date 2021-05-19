import React from 'react';
import {Provider} from 'mobx-react';
import BarberPageViewStores from './view-stores/store';
import Main from './main';

export default function App() {
  const barberPageViewStores = new BarberPageViewStores();

  return (
    <Provider barberPageViewStores={barberPageViewStores}>
      <Main />
    </Provider>
  );
}
