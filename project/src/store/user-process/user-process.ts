import {createSlice} from '@reduxjs/toolkit';
import {checkAuthorizationAction, loginAction, logoutAction} from './api-action';

import {UserProcess} from '../../types/state';
import {UserData} from '../../types/user';
import {Reducer, AuthorizationStatus} from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData
};


export const userProcess = createSlice({
  name: Reducer.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorizationAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.userData = action.payload;
      })
      .addCase(checkAuthorizationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorized;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorized;
      });
  }
});
