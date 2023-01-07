import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {
  fetchProducts,
  createProducts,
  addProduct,
  updateProduct,
} from '../../firebase';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProductsAsync',
  async payload => {
    const res = await fetchProducts(payload);
    return res;
  },
);

export const createProductsAsync = createAsyncThunk(
  'products/createProductsAsync',
  async payload => {
    const res = await createProducts(payload);
    return res;
  },
);

export const addProductAsync = createAsyncThunk(
  'products/addProductAsync',
  async payload => {
    const res = await addProduct(payload);
    return res;
  },
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProductAsync',
  async payload => {
    const res = await updateProduct(payload);
    return res;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    error: null,
    isLoading: false,
    products: {},
    productList: [],
  },
  reducers: {
    updateProducts: (state, action) => {
      console.log('action.payloadx', action.payload);
      state.productList = action.payload;
      console.log('state.productList', state.productList);
    },
  },
  extraReducers: builder => {
    //createProducts
    builder.addCase(createProductsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createProductsAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //fetchProducts
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productList = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //addProduct
    builder.addCase(addProductAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.isLoading = false;
    });
    builder.addCase(addProductAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //deleteProduct
    builder.addCase(updateProductAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.isLoading = false;
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export const {updateProducts} = productsSlice.actions;

export default productsSlice.reducer;
