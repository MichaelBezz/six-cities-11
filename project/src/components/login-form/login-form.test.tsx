import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {AnyAction} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import LoginForm from './login-form';
import {State} from '../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);

const history = createMemoryHistory();

describe('Component: LoginForm', () => {
  it('should render correctly', async () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <LoginForm />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    const headerElements = screen.getAllByText(/Sign in/i);
    expect(headerElements[0]).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(/Sign in/i);

    await userEvent.type(screen.getByTestId('email'), 'test');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('password'), '123456');
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should dispatch action "login" if user correctly write user data', async () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <LoginForm />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('email'), 'test@test.com');
    await userEvent.type(screen.getByTestId('password'), '123456qwe');

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('USER/login/pending');
  });
});
