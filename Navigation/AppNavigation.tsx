import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginPage';
import SignupScreen from '../screens/auth/SignupPage';
import IndexPage from '../screens/app/IndexPage';
import HomePage from '../screens/app/HomePage';
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Index">
      {/* <Stack.Screen name="Home" component={HomePage} /> */}
      <Stack.Screen name="Index" component={IndexPage} />
      {/* <Stack.Screen name="edit-profile" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
