import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './Cart';
import Checkout from './Checkout';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="cart">
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default Index;
