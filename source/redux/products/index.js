import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {fetchProducts, createProducts} from '../../firebase';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProductsAsync',
  async () => {
    const res = await fetchProducts();
    return res;
  },
);

export const createProductsAsync = createAsyncThunk(
  'products/createProductsAsync',
  async payload => {
    console.log('payload2', payload);
    await createProducts(payload);
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    error: null,
    isLoading: false,
    productsList: [],
  },
  reducers: {},
  extraReducers: builder => {
    //fetchProducts
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.productsList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;
