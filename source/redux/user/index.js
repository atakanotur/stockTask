import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {createUser, signIn} from '../../firebase';

export const registerAsync = createAsyncThunk(
  'user/registerAsync',
  async payload => {
    const res = await createUser(payload);
    return res;
  },
);

export const signInAsync = createAsyncThunk(
  'user/signInAsync',
  async paylaod => {
    const res = await signIn(paylaod);
    return res;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authResult: false,
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authResult = action.payload.authResult;
      state.isLoading = false;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    //signIn
    builder.addCase(signInAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authResult = action.payload.authResult;
      state.isLoading = false;
    });
    builder.addCase(signInAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export const {resetError} = userSlice.actions;

export default userSlice.reducer;
