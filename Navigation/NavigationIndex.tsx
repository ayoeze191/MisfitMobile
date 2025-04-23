import {ActivityIndicator, Text, View} from 'react-native';
import {useAuth} from '../context/auth';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
const NavigationIndex = () => {
  const {isAuthenticated, isAuthenticating} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticating == true ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
          }}>
          <ActivityIndicator size={'large'} color={'#C67C4E'} />
        </View>
      ) : isAuthenticated ? (
        <AppNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default NavigationIndex;
