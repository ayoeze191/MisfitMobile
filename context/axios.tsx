import axios, {AxiosInstance} from 'axios';
import React, {useContext} from 'react';
import {logger} from 'react-native-logs';
// import {Platform} from 'react-native';
import AuthContext from './auth';
// import useMixpanel from '../hooks/useMixpanel';

var log = logger.createLogger();

interface AxiosContextProps {
  authAxios: AxiosInstance | undefined;
  nonAuthAxios: AxiosInstance | undefined;
}

const AxiosContext = React.createContext<AxiosContextProps>({
  authAxios: undefined,
  nonAuthAxios: undefined,
});
const {Provider} = AxiosContext;
let devUrl = 'http://localhost:8000';

const AxiosProvider = ({children}: {children: React.ReactNode}) => {
  const authContext = useContext(AuthContext);
  // const mixpanel = useMixpanel();

  const authAxios = axios.create({
    baseURL: devUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const nonAuthAxios = axios.create({
    baseURL: devUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  authAxios.interceptors.request.use(
    async config => {
      log.info(`Making request to ${config.url}`);
      const token = authContext.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  authAxios.interceptors.response.use(
    config => {
      return config;
    },
    error => {
      console.log('Error from AxiosContext', error);
      if (
        error?.response?.status === 401 &&
        error?.response?.data?.data?.message === 'Access denied'
      ) {
        authContext.logout();
      } else if (error.message === 'Network Error') {
        console.log('Network Error');

        authContext.logout();
        return;
      }
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        authAxios,
        nonAuthAxios,
      }}>
      {children}
    </Provider>
  );
};

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (context === undefined) {
    throw new Error('useAxios must be used within a AxiosProvider');
  }
  return context;
};

export {AxiosContext, AxiosProvider};
