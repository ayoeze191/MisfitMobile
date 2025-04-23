import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import Account from './Account';
import EditProfile from './Edit-profile';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="account">
      <Stack.Screen name="account" component={Account} />
      <Stack.Screen name="edit-profile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Index;
