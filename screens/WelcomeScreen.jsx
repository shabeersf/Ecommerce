import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate('InnerPage'), 2500)
}, [])
  return (
    <View className='flex-1 bg-primary justify-center items-center'>
      <StatusBar style='light' />
      <View className=' flex-row items-center space-x-2 flex-1'>
      <Image source={require('../assets/images/logo-welcome.png')}  style={{height:hp(9),width:hp(9),objectFit:'contain'}}  />
      
      </View>
    </View>
  )
}

export default WelcomeScreen