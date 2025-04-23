import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  login: undefined;
  signup: undefined;
}; // Define the RootStackParamList inline or adjust as needed
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {ActivityIndicator} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useAxios} from '../../context/axios';
import Toast from 'react-native-toast-message';
const SignupScreen = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

  const axios = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    setSubmitting(true);
    console.log('Submiting');
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;
      await firestore().collection('users').doc(uid).set({
        email,
        firstName,
        lastName,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Toast.show({
        type: 'success',
        text1: 'Your Account has been Successfully Created, please log in',
      });
      navigate.navigate('login');
      console.log('User account created:', userCredential.user);
    } catch (error: any) {
      setSubmitting(false);
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({type: 'error', text1: 'Email already in use'});
      } else {
        Toast.show({type: 'error', text1: "Couldn't create a user"});
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          firstName: Yup.string().required('Name is required'),
          lastName: Yup.string().required('Last Name is required'),
        })}
        onSubmit={async values => {
          await signUp(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
          );
          // axios.nonAuthAxios?.post('/auth/register', {...values});
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text
                style={{color: 'red', marginBottom: 10, marginRight: 'auto'}}>
                {errors.email}
              </Text>
            )}

            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text
                style={{color: 'red', marginBottom: 10, marginRight: 'auto'}}>
                {errors.password}
              </Text>
            )}
            <TextInput
              placeholder="firstName"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text
                style={{color: 'red', marginBottom: 10, marginRight: 'auto'}}>
                {errors.firstName}
              </Text>
            )}
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              placeholderTextColor="#999"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text
                style={{color: 'red', marginBottom: 10, marginRight: 'auto'}}>
                {errors.lastName}
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => navigate.navigate('login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};
export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C67C4E',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    color: 'black',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#C67C4E',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    marginTop: 15,
    color: '#666',
  },
  footerLink: {
    color: '#C67C4E',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
});
