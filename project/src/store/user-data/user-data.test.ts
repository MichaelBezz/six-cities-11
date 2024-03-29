import {userData} from './user-data';
import {checkAuthorization, login, logout} from './api-actions';
import {UserDataState} from '../../types/state';
import {makeFakeUserData} from '../../utils/mocks';
import {AuthorizationStatus} from '../../constants';

const fakeUserData = makeFakeUserData();

describe('Reducer: userData', () => {
  let state: UserDataState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: checkAuthorizationAction', () => {
    it('should update authorizationStatus to "AUTHORIZED" and return "userData" if action fulfilled', () => {
      expect(userData.reducer(state, {type: checkAuthorization.fulfilled.type, payload: fakeUserData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Authorized, userData: fakeUserData});
    });

    it('should update authorizationStatus to "NO_AUTHORIZED" if action rejected', () => {
      expect(userData.reducer(state, {type: checkAuthorization.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuthorized, userData: null});
    });
  });

  describe('Action: loginAction', () => {
    it('should update authorizationStatus to "AUTHORIZED" and return "userData" if action fulfilled', () => {
      expect(userData.reducer(state, {type: login.fulfilled.type, payload: fakeUserData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Authorized, userData: fakeUserData});
    });
    it('should update authorizationStatus to "NO_AUTHORIZED" if action rejected', () => {
      expect(userData.reducer(state, {type: login.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuthorized, userData: null});
    });
  });

  describe('Action: logoutAction', () => {
    it('should update authorizationStatus to "NO_AUTHORIZED" if action fulfilled', () => {
      expect(userData.reducer(state, {type: logout.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuthorized, userData: null});
    });
  });
});
