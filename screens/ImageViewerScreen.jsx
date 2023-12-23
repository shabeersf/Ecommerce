import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ImageUrl } from "../baseData";

const ImageViewerScreen = ({ route, navigation }) => {
  const { image, name } = route.params;
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1  flex items-center mt-9 mb-5 ">
        <View
          className="flex-row justify-between w-full bg-white p-3"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text
            className="font-bold mb-2 flex-1 text-center mr-2"
            style={{ fontSize: hp(2.2) }}
          >
            {name}
          </Text>
        </View>
        <Image
              source={{
                uri: `${ImageUrl}/photos/orginal/${image}`,
              }}
              width={wp(90)}
              height={hp(90)}
              resizeMode='cover'
              className="rounded-md"
            />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default ImageViewerScreen;
