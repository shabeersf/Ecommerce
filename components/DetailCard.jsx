import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { ImageUrl } from '../baseData';
import { useNavigation } from '@react-navigation/native';
const DetailCard = ({item,name}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity className="rounded-md" onPress={()=>navigation.navigate("ViewImage",{
        image:item.prod_img,
        name:name
    })} >
      <Image
              source={{
                uri: `${ImageUrl}/photos/orginal/${item.prod_img}`,
              }}
              width={wp(90)}
              height={hp(50)}
              resizeMode='contain'
              className="rounded-md"
            />
    </TouchableOpacity>
  )
}

export default DetailCard