import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {removeToken, saveToken} from '../../services/token';
import {AppDispatch, State} from '../../types/state';
import {AuthorizationData} from '../../types/authorization';
import {UserData} from '../../types/user';
import {APIRoute, Reducer} from '../../constants';

export const checkAuthorization = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Reducer.User}/checkAuthorization`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<UserData | void, AuthorizationData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Reducer.User}/login`,
  async ({login: email, password}, {extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      return data;
    }
    catch {
      toast.error('Can\'t login');
    }
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Reducer.User}/logout`,
  async (_arg, {extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      removeToken();
    }
    catch {
      toast.error('Can\'t logout');
    }
  }
);
