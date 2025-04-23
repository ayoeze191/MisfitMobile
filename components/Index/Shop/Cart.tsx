import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import STORAGE from '../../../Storage';
import {useEffect, useState, useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
type RootStackParamList = {
  checkout: undefined;
  list: undefined;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<
    {title: string; price: number; quantity: number}[]
  >([]);
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, seTloading] = useState(false);
  const getCartItems = async () => {
    seTloading(true);
    setCartItems(await STORAGE.NON_SECURE.getObject('Misfit_cart'));
    seTloading(false);
  };
  useFocusEffect(
    useCallback(() => {
      const fetchItems = async () => {
        await getCartItems();
      };
      fetchItems();
    }, []),
  );

  const handleCheckout = async () => {
    try {
      const user = await STORAGE.SECURE.getObject('Misfit_user');
      const total_unit = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      const total_cost = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
      const checkedoutItem = {
        user: user.id,
        ...(await STORAGE.NON_SECURE.getObject('Misfit_cart')),
        total_unit,
        total_cost,
      };
      const orderRef = firestore().collection('orders').doc(); // no ID passed
      const uid = orderRef.id;
      await orderRef.set({
        uid,
        ...checkedoutItem,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      await STORAGE.NON_SECURE.remove('Misfit_cart');
      setCartItems([]);
      Toast.show({type: 'success', text1: 'Checked out', visibilityTime: 200});
      navigate.navigate('checkout');
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <View style={style.loader}>
      <ActivityIndicator size={'large'} color={'#C67C4E'} />
    </View>
  ) : (
    <View style={style.container}>
      {cartItems && cartItems.length > 0 ? (
        <>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: '#ccc',
              marginTop: 10,
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Cart Summary
            </Text>
          </View>
          <ScrollView>
            {cartItems.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginBottom: 5,
                      maxWidth: 180,
                    }}>
                    Item: {item.title}
                  </Text>
                  <Text style={{fontSize: 14, color: '#555', marginBottom: 5}}>
                    Price: ${item.price}
                  </Text>
                  <Text style={{fontSize: 14, color: '#555'}}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingHorizontal: 10,
                      color: '#C67C4E',
                    }}
                    onPress={async () => {
                      const updatedItems = [...cartItems];
                      if (updatedItems[index].quantity > 1) {
                        updatedItems[index].quantity -= 1;
                        setCartItems(updatedItems);
                        await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
                          ...updatedItems,
                        ]);
                      }
                    }}>
                    -
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingHorizontal: 10,
                      color: '#C67C4E',
                    }}
                    onPress={async () => {
                      const updatedItems = [...cartItems];
                      updatedItems[index].quantity += 1;
                      setCartItems(updatedItems);
                      await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
                        ...updatedItems,
                      ]);
                    }}>
                    +
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'red',
                      marginLeft: 10,
                    }}
                    onPress={async () => {
                      const updatedItems = cartItems.filter(
                        (_, i) => i !== index,
                      );
                      setCartItems(updatedItems);
                      await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
                        ...updatedItems,
                      ]);
                    }}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color={'#C67C4E'}
                    />
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#f1f1f1',
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                color: '#333',
              }}>
              Total Quantity:{' '}
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </Text>
            <Text style={{fontSize: 16, color: '#333'}}>
              Total Cost: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </Text>
          </View>
          {cartItems.length > 0 && (
            <View>
              <Button
                title="Checkout"
                color={'#C67C4E'}
                onPress={handleCheckout}
              />
            </View>
          )}
        </>
      ) : (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <MaterialCommunityIcons
            name="cart-off"
            size={80}
            color={'#C67C4E'}
            style={{marginBottom: 20}}
          />
          <Text style={{fontSize: 18, color: '#555', marginBottom: 20}}>
            Your cart is empty
          </Text>
          <Button
            title="Go to Products"
            color={'#C67C4E'}
            onPress={() => {
              // Navigate to the product page
              navigate.navigate('list');
              console.log('Navigate to product page');
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Cart;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
