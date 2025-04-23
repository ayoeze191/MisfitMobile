import './gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './screens/app/HomePage';
import IndexPage from './screens/app/IndexPage';
import {useEffect} from 'react';
import SignupScreen from './screens/auth/SignupPage';
import LoginScreen from './screens/auth/LoginPage';
import {AuthProvider, useAuth} from './context/auth';
import {AxiosProvider} from './context/axios';
import Toast from 'react-native-toast-message';
import AuthNavigation from './Navigation/AuthNavigation';
import AppNavigation from './Navigation/AppNavigation';
import NavigationIndex from './Navigation/NavigationIndex';

// import {DevSettings} from 'react-native';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  // useEffect(() => {
  //   DevSettings.reload(); // Reload app to apply changes
  // }, []);
  return (
    <AxiosProvider>
      <AuthProvider>
        <NavigationIndex />
      </AuthProvider>
      <Toast />
    </AxiosProvider>
  );
}
export default App;
