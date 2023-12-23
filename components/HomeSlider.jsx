import { View, Text, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { ImageUrl } from '../baseData';
const HomeSlider = ({item}) => {
  return (
    <View className="bg-white relative" style={{ height: hp(30) }}>
    <Image
      source={{
        uri: `${ImageUrl}/photos/large/${item.image}`,
      }}
      alt="logo"
      style={{ width: wp(100), height: "100%" }}
    />
    <View
      className="absolute z-20 justify-end pb-5 px-3"
      style={{ height: hp(30) }}
    >
      <Text
        style={{ fontSize: hp(4.5) }}
        className="text-white font-bold tracking-tight"
      >
        {item.title}
      </Text>
    </View>
  </View>
  )
}

export default HomeSlider