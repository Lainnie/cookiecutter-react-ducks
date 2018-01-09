import { authRemotesBuilder, authActionTypes } from '../../auth';
import { call, takeLatest } from 'redux-saga/effects';

const loginResponse = '1234567890';
const error = {
  message: 'some useful error message',
};
const fetchMock = jest.fn();
const loginRequestMock = jest.fn();
const operations = {
  loginSuccess: jest.fn(({ username, accessToken }) => ({
    payload: {
      username,
      accessToken,
    },
  })),
  loginFailure: jest.fn(error => ({ error })),
};

const { login } = authRemotesBuilder({
  authOperations: operations,
  fetch: fetchMock,
  loginRequest: loginRequestMock,
});

describe('auth remotes', () => {
  describe('middlewares', () => {
    it('exports LOGIN middleware', () => {
      expect(takeLatest).toHaveBeenCalledWith(
        authActionTypes.LOGIN,
        expect.any(Function)
      );
    });
  });

  describe('.login', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('happy path', () => {
      it('calls loginSuccess with { username, accessToken }', () => {
        call.mockImplementationOnce(() => loginResponse);

        const gen = login({
          type: 'LOGIN',
          payload: {
            username: 'admin',
            password: 'admin',
          },
        });

        while (!gen.next(loginResponse).done) {}

        expect(call).toHaveBeenCalledTimes(1);
        expect(call).toHaveBeenCalledWith(
          loginRequestMock,
          fetchMock,
          expect.any(String),
          {
            method: 'POST',
            body: expect.any(String),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        expect(operations.loginSuccess).toHaveBeenCalledWith({
          username: expect.any(String),
          accessToken: expect.any(String),
        });
        expect(operations.loginFailure).not.toHaveBeenCalled();
      });
    });

    describe('wrong path', () => {
      it('calls loginFailure with error', () => {
        call.mockImplementationOnce(() => {
          throw error;
        });

        const gen = login({
          type: 'SOMETHING',
          payload: {
            username: 'admin',
            password: 'admin',
          },
        });

        while (!gen.next().done) {}

        expect(call).toHaveBeenCalledTimes(1);
        expect(call).toHaveBeenCalledWith(
          loginRequestMock,
          fetchMock,
          expect.any(String),
          {
            method: 'POST',
            body: expect.any(String),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        expect(operations.loginFailure).toHaveBeenCalledWith(error);
        expect(operations.loginSuccess).not.toHaveBeenCalled();
      });
    });
  });
});
