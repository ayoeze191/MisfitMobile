import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginPage';
import SignupScreen from '../screens/auth/SignupPage';
import HomePage from '../screens/app/HomePage';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
