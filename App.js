import React from 'react';
import Navigation from './source/navigation';

import {Provider} from 'react-redux';

import store from './source/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
