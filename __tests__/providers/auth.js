import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import AuthProvider, { useAuth } from '_providers/Auth';
import { response_user } from '../../setup/faker-mocks';

describe('Auth Provider tests', () => {
  let wrapper;
  beforeEach(() => {
    // eslint-disable-next-line react/prop-types
    wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  });

  afterEach(() => {
    wrapper = null;
  });

  test('auto auth', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const persistKey = 'auth';
    await localStorage.setItem(persistKey, JSON.stringify(response_user));
    act(() => {
      result.current.autoAuth();
    });
    expect(result.current.auth).toMatchObject(response_user);
    await localStorage.removeItem(persistKey);
  });

  test('auto auth', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const persistKey = 'auth';
    await localStorage.setItem(persistKey, JSON.stringify(response_user));
    act(() => {
      result.current.autoAuth();
    });

    // assert logged in state
    expect(result.current.auth).toMatchObject(response_user);

    act(() => {
      result.current.logout();
    });

    expect(result.current.auth).toMatchObject({
      activeUser: {},
      token: '',
    });
  });

  test('login', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login();
    });

    await waitForNextUpdate();
    expect(result.current.auth).toMatchObject(response_user);
  });

  test('register', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.register();
    });

    await waitForNextUpdate();
    expect(result.current.auth).toMatchObject(response_user);
  });
});
