import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageOnboarding from './../../assets/ImageOnboarding.png';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  login: undefined;
  signup: undefined;
  Index: undefined;
}; // Define the RootStackParamList inline or adjust as needed
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/auth';
const HomePage = () => {
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {isAuthenticated} = useAuth();
  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <View style={{height: '60%'}}>
          <Image source={ImageOnboarding} />
        </View>
        <View style={{padding: 24, marginTop: -60}}>
          <Text
            style={{
              color: 'white',
              fontSize: 32,
              textAlign: 'center',
              letterSpacing: 0.5,
              fontWeight: 'semibold',
              fontFamily: 'Sora-SemiBold',
              lineHeight: 52,
            }}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text
            style={{
              color: '#A2A2A2',
              textAlign: 'center',
              fontSize: 14,
              marginTop: 8,
              fontFamily: 'Sora-Light',
              letterSpacing: 1.5,
              lineHeight: 20,
              fontWeight: '400',
            }}>
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you
          </Text>
        </View>
        <View style={{padding: 24, color: 'white', marginTop: 32}}>
          {/* <Button
            title="Get started"
          /> */}
          <RequestFInancialAidButton
            handleClick={() =>
              isAuthenticated
                ? navigate.navigate('Index')
                : navigate.navigate('login')
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const RequestFInancialAidButton = ({handleClick}) => {
  return (
    <View
    // className="mb-[20px]"
    >
      <TouchableOpacity
        onPressIn={handleClick}
        style={{
          backgroundColor: '#B27046',
          padding: 16,
          borderRadius: 16,
        }}
        // className="text-left bg-[#ffffff] rounded-[12px] py-[16px] px-[12px] flex flex-row justify-between items-center"
        onPress={() => {}}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,

            fontFamily: 'Sora-SemiBold',
          }}>
          {/* // className=" leading-[24px] text-[#4C3190] ] font-dmsans text-base font-bold "> */}
          Get Started
        </Text>
        {/* <ChevronRightIcon color={'#4C3190'} /> */}
      </TouchableOpacity>
    </View>
  );
};
export default HomePage;
