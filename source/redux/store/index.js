import {configureStore} from '@reduxjs/toolkit';

import productsSlice from '../products';
import userSlice from '../user';

const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
  },
});

export default store;
