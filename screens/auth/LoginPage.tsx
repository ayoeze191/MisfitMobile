import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import firebaseauth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
  login: undefined;
  signup: undefined;
  Index: undefined;
}; // Define the RootStackParamList inline or adjust as needed
import React, {useState} from 'react';
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
import {useAuth} from '../../context/auth';
import STORAGE from '../../Storage';
const LoginScreen = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  const auth = useAuth();
  const axios = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const login = async (email: string, password: string) => {
    setSubmitting(true);
    try {
      const userCredential = await firebaseauth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User signed in:', userCredential.user);
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
        text2: 'You are now logged in.',
        visibilityTime: 1000,
      });
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const uid = user.uid;
      const userDoc = await firestore().collection('users').doc(uid).get();
      const userData = userDoc.data();
      await STORAGE.SECURE.storeObject('Misfit_token', idToken);
      await STORAGE.SECURE.storeObject('Misfit_user', {id: uid, ...userData});
      if (!userData) {
        throw new Error('User data not found in Firestore');
      }
      await auth.login(idToken, {id: uid, ...userData});

      setSubmitting(false);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error!.message!,
        text2: 'You can"t login',
      });
      setSubmitting(false);
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={async values => {
          await login(values.email, values.password);
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
            <View style={{width: '100%'}}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={{color: 'red', marginBottom: 10}}>
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
              <Text style={{color: 'red', marginBottom: 10}}>
                {errors.password}
              </Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity> */}

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => navigate.navigate('signup')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
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
