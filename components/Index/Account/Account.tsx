import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import STORAGE from '../../../Storage';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../../../context/auth';

const Account = () => {
  const navigate = useNavigation();
  const {logout} = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    setUser(await STORAGE.SECURE.getObject('Misfit_user'));
    console.log(await STORAGE.SECURE.getObject('Misfit_user'));
    setLoading(false);
  };
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     await getUser();
  //   };
  //   fetchUser();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );
  return loading ? (
    <View style={style.loader}>
      {' '}
      <ActivityIndicator color={'#C67C4E'} size={'large'} />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <View style={{marginBottom: 20, alignItems: 'center'}}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: '#fff'}}>
            {user ? user.firstName[0] : 'A'}
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
          {user !== null ? user.firstName + ' ' + user.lastName : ''}
        </Text>
        <Text style={{fontSize: 14, color: 'gray'}}>
          {user !== null ? user!.email! : ''}
        </Text>
      </View>
      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}>
          <Text
            style={{fontSize: 18, marginLeft: 10}}
            onPress={() => {
              console.log('Edit Profile Pressed');
              navigate.navigate('edit-profile');
              // Add navigation or functionality here
            }}>
            Edit Profile
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}>
          <Text style={{fontSize: 18, marginLeft: 10}}>Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}>
          <Text style={{fontSize: 18, marginLeft: 10}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Account;

const style = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
