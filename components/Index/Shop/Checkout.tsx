import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import STORAGE from '../../../Storage';

const Checkout = () => {
  const [oorders, setOrdersItem] = useState<{id: string; [key: string]: any}[]>(
    [],
  );
  const getCheckoutItems = async () => {
    const ordersSnapshot = await firestore().collection('orders').get();
    const user = await STORAGE.SECURE.getObject('Misfit_user');
    const userId = user.id;
    const all_orders = ordersSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(order => order.user === userId);
    setOrdersItem([...all_orders]);
  };

  console.log(oorders);

  const orders = [
    {
      id: 1,
      name: 'Order 1',
      totalPrice: '$30.00',
      totalUnits: 3,
      products: [
        {name: 'Product A', amount: 1, price: '$10.00'},
        {name: 'Product B', amount: 2, price: '$20.00'},
      ],
    },
    {
      id: 2,
      name: 'Order 2',
      totalPrice: '$45.00',
      totalUnits: 5,
      products: [
        {name: 'Product C', amount: 3, price: '$15.00'},
        {name: 'Product D', amount: 2, price: '$30.00'},
      ],
    },
    {
      id: 3,
      name: 'Order 3',
      totalPrice: '$60.00',
      totalUnits: 4,
      products: [
        {name: 'Product E', amount: 2, price: '$40.00'},
        {name: 'Product F', amount: 2, price: '$20.00'},
      ],
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchItems = async () => {
        await getCheckoutItems();
      };
      fetchItems();
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {orders.map(order => (
        <View
          key={order.id}
          style={{
            marginBottom: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            width: '100%',
          }}
          onStartShouldSetResponder={() => true}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{order.name}</Text>
          <Text>Total Price: {order.totalPrice}</Text>
          <Text>Total Units: {order.totalUnits}</Text>
          <Button
            title="Pay For This"
            onPress={() => console.log(`Paying for ${order.name}`)}
            color="#C67C4E"
          />
          <View
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: '#C67C4E',
              color: '#C67C4E',
            }}>
            <Button
              title="View Items"
              onPress={() =>
                console.log(`Viewing items for ${order.name}:`, order.products)
              }
              color="white"
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Checkout;
