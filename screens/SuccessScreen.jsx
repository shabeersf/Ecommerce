import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const SuccessScreen = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     navigation.navigate("Home"); // Replace "Home" with your actual home screen name
    //   }, 2000); // 3000 milliseconds = 3 seconds
  
    //   return () => clearTimeout(timeout);
    // }, [navigation]);
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
      <LottieView source={require("../assets/images/animation/success.json")} style={{width:wp(100)}}  autoPlay loop />
      <TouchableOpacity style={{ width: wp(80) }} onPress={()=>navigation.navigate("Home")} className="p-3  bg-primary rounded-full">
                      <Text
                        className="text-center text-white font-bold"
                        style={{ fontSize: hp(2) }}
                      >
                        Continue to Shopping
                      </Text>
                    </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;
