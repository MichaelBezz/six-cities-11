import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {checkAuthorization, login, logout} from './api-actions';
import {AuthorizationData} from '../../types/authorization';
import {State} from '../../types/state';
import {makeFakeUserData} from '../../utils/mocks';
import {StatusCodes} from 'http-status-codes';
import {APIRoute} from '../../constants';

const fakeUserData = makeFakeUserData();

describe('Async actions: userData', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is "AUTHORIZED" and loaded user data when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const {payload} = await store.dispatch(checkAuthorization());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthorization.pending.type,
      checkAuthorization.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);
  });

  it('should save token and load user data when POST /login', async () => {
    const fakeUser: AuthorizationData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    const {payload} = await store.dispatch(login(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', fakeUserData.token);
  });

  it('should remove token when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logout());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
