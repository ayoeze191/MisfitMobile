import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import List from '../../components/Index/list';
import Notification from '../../components/Index/Notification';

import Index from '../../components/Index/Account/Index';
import ShopIndex from '../../components/Index/Shop/Index';
import Checkout from '../../components/Index/Shop/Checkout';

const Tab = createBottomTabNavigator();
// import { useSharedValue } from 'react-native-reanimated';
const IndexPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  // console.log(show);
  return (
    <SafeAreaView>
      <View style={Style.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="list"
            component={List}
            options={{
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="home"
                  size={20}
                  color={focused ? '#C67C4E' : ''}
                />
              ),
            }}
          />

          <Tab.Screen
            name="cart"
            component={ShopIndex}
            options={{
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="cart"
                  size={20}
                  color={focused ? '#C67C4E' : ''}
                />
              ),
            }}
          />
          <Tab.Screen
            name="checkout"
            component={Checkout}
            options={{
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="credit-card"
                  size={20}
                  color={focused ? '#C67C4E' : ''}
                />
              ),
            }}
          />
          <Tab.Screen
            name="account"
            component={Index}
            options={{
              tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color={focused ? '#C67C4E' : ''}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  headercontainer: {
    height: 200,
    position: 'relative',
    width: '100%',
    backgroundColor: 'red',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    position: 'absolute',
  },
  LocationTitle: {
    color: '#A2A2A2',
    fontFamily: 'Sora-Regular',
  },
  Locationconta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  Location: {
    color: '#ffffff',
    fontFamily: 'Sora-Regular',
  },
  Search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(49, 49, 49, 1)',
    flex: 1,
    position: 'relative',
    borderRadius: 12,
    height: 52,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    height: 52,
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    marginTop: 24,
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    fontSize: 14,
    alignItems: 'center',
    // position: 'relative',
    // height: '100%',
  },
  filet: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#C67C4E',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    marginTop: -50,
    width: '100%',
    paddingHorizontal: 16,
    height: 140,
    display: 'flex',
    position: 'relative',
    borderRadius: 16,
    // backgroundColor: 'red',
  },
  BannerDetails: {
    position: 'absolute',
    paddingHorizontal: 50,
    paddingVertical: 13,
  },
  bannerImage: {
    borderRadius: 16,
    width: '100%',
    left: 2,
  },
  promo: {
    backgroundColor: '#ED5151',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    width: 60,
    height: 26,
    textAlign: 'center',
  },
  BigText: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: '#fff',
    fontFamily: 'Sora-SemiBold',
  },
});

export default IndexPage;

{
  /* <Tab.Navigator initialRouteName="prod">
<Tab.Screen name="prod" component={TabScreen} />
</Tab.Navigator> */
}
