import React, {useEffect, useState} from 'react';
import STORAGE from '../Storage';

interface AuthContextProps {
  authState: AuthState;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  login: (
    token: string,
    user: any,
    funcBeforeAuthChange?: () => void,
    funcAfterAuthChange?: () => void,
  ) => void;
  logout: () => void;
  getAccessToken: () => string;
  getUser: () => User | null;
  setUser: (user: object) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticating: true,
  isAuthenticated: false,
  login: () => {},
  authState: {
    token: '',
    user: null,
  },
  logout: () => {},
  getAccessToken: () => '',
  getUser: () => null,
  setUser: () => {},
});

const {Provider} = AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nameOnCertificate: string;
  gender: string;
  profileImage?: string;
  favoriteCourses: string[];
  personality: string;
}

interface AuthState {
  token: string;
  user: User | null;
}

async function getTokenAndData() {
  const token = await STORAGE.NON_SECURE.getString('Misfit_token');
  const user = await STORAGE.NON_SECURE.getObject('Misfit_user');

  return {
    token: token ? token : '',
    user: user ? user : {},
  };
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    token: '',
    user: null,
  });

  useEffect(() => {
    const initializeAuthState = async () => {
      const initialAuthState = await getTokenAndData();
      setAuthState(initialAuthState);
      console.log('initialAuthState', initialAuthState);
      if (initialAuthState.token) {
        setTimeout(() => {
          setIsAuthenticating(false);
          setIsAuthenticated(true);
        }, 4000);
      } else {
        setTimeout(() => {
          setIsAuthenticating(false);
          setIsAuthenticated(false);
        }, 4000);
      }
    };

    initializeAuthState();
  }, []);

  const getAccessToken = () => {
    return authState.token;
  };

  const getUser = () => {
    return authState.user;
  };

  const setUserAndToken = async (user: any, token: string) => {
    await STORAGE.NON_SECURE.storeString('Misfit_token', token);
    await STORAGE.NON_SECURE.storeObject('Misfit_user', user);

    setAuthState({
      ...authState,
      user,
      token,
    });
  };

  const logout = () => {
    setUserAndToken({}, '');
    setIsAuthenticated(false);
  };

  const login = async (token: string, user: any) => {
    setIsAuthenticating(true);
    await setUserAndToken(user, token);
    setIsAuthenticating(false);
    setIsAuthenticated(true);
  };

  const setUser = async (user: any) => {
    await STORAGE.NON_SECURE.storeObject('Misfit_user', user);
    setAuthState({
      ...authState,
      user,
    });
  };

  return (
    <Provider
      value={{
        authState,
        isAuthenticating,
        isAuthenticated,
        login,
        logout,
        getAccessToken,
        getUser,
        setUser,
      }}>
      {children}
    </Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default AuthContext;

export {AuthContext, AuthProvider};
