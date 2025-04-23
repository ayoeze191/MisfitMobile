import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import STORAGE from '../../../Storage';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  account: undefined;
};

const EditProfile: React.FC = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const [id, setId] = useState(null);
  const getInitialDetails = async () => {
    console.log('fetching details');
    const user = await STORAGE.SECURE.getObject('Misfit_user');
    console.log(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setId(user.id);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      await getInitialDetails();
    };
    fetchDetails();
  }, []);

  const handleSave = async () => {
    if (!firstName) {
      Alert.alert('Error', 'First Name is required.');
      return;
    }
    if (!lastName) {
      Alert.alert('Error', 'Last Name required.');
      return;
    }
    const updatedData = {firstName, lastName};
    try {
      await firestore().collection('users').doc(id!).update(updatedData);
      const user = {...(await STORAGE.SECURE.getObject('Misfit_user'))};
      user['firstName'] = firstName;
      user['lastName'] = lastName;
      await STORAGE.SECURE.storeObject('Misfit_user', user);
      console.log(user, 'Updated userDetails');

      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully!',
      });
      navigate.navigate('account');
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
      });
    }
    // Add logic to save profile changes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={lastName}
        onChangeText={setLastName}
        keyboardType="email-address"
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      /> */}
      <Button title="Save Changes" onPress={handleSave} color={'#C67C4E'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditProfile;
