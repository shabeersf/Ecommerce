import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BaseUrl, ImageUrl } from "../baseData";
import { addToWishlist, checkIfInWishlist } from "../lib/actions";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ item }) => {
  const navigation = useNavigation();

  const [heartActive, setHeartActive] = useState(false);

  
  useEffect(() => {
    const checkWishlist = async () => {
      const isInWishlist = await checkIfInWishlist(item.id);
      setHeartActive(isInWishlist);
    };
    checkWishlist();
  }, [item.id]);

  const handleHeart = async(id) => {
    setHeartActive(!heartActive);
    await addToWishlist(id)
  };
  const stars = [];

  for (let i = 0; i < item.rating; i++) {
    stars.push(<FontAwesome key={i} name="star" size={15} color="#FFBA49" />);
  }

  return (
    <View
      style={{
        
        backgroundColor: "white",
      }}
      className="rounded-md"
    >
      <View className="p-3 space-y-1">
        <View className="relative">
          <TouchableOpacity onPress={()=>navigation.navigate("Details",{id:item.id})}>
            <Image
              source={{
                uri: `${ImageUrl}/photos/orginal/${item.image}.jpg`,
              }}
              width={wp(37)}
              height={hp(25)}
              className="rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            className="absolute -bottom-[15] right-0 p-2 bg-white shadow-xl rounded-full"
            onPress={()=>handleHeart(item.id)}
          >
            {heartActive ? (
              <FontAwesome name="heart" size={20} color="red" />
            ) : (
              <FontAwesome5 name="heart" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-1 pt-3">
          <View className="flex-row items-center gap-1">{stars}</View>
          <Text className="text-zinc-500">({item.reviews})</Text>
        </View>
        <Text className="text-zinc-500" style={{fontSize:hp(1.6)}}>{item.brand}</Text>
        <Text className="font-semibold" style={{fontSize:hp(2.2)}}>{
            item.name.length >15 ? item.name.slice(0,15)+'...' : item.name
        }</Text>
        <View className="flex-row items-center gap-1">
        <Text className="text-zinc-500 line-through" style={{fontSize:hp(1.8)}}>₹{item.mrp_price}</Text>
        <Text className="text-primary  font-semibold" style={{fontSize:hp(1.8)}}>₹{item.sale_price}</Text>
  
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
