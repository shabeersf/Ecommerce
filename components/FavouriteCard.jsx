import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ImageUrl } from "../baseData";
import { addToCart, checkIfInCart } from "../lib/actions/cartsave";
import { useNavigation } from "@react-navigation/native";

const FavouriteCard = ({ item, removeProductById, snackOpen, indexValue }) => {
  const navigation = useNavigation();

  const [showBag, setSetshowBag] = useState(true);
  const stars = [];

  for (let i = 0; i < item.rating; i++) {
    stars.push(<FontAwesome key={i} name="star" size={15} color="#FFBA49" />);
  }
  useEffect(() => {
    const checkFavourite = async () => {
      const isInCart = await checkIfInCart(item.id);

      if (isInCart) {
        setSetshowBag(false);
      }
    };
    checkFavourite();
  }, [item.id]);
  const handleBag = async (id) => {
    setSetshowBag(false);
    snackOpen();
    await addToCart(item);
  };
  return (
    <View className="flex-1 mb-3" style={{ width: wp(90) }}>
      <View
        className="relative w-full flex-1 bg-white p-2 py-1 rounded-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <View className="flex-row gap-2">
          <TouchableOpacity  onPress={()=>navigation.navigate("Details",{id:item.id})}>
            <Image
              source={{
                uri: `${ImageUrl}/photos/orginal/${item.image}.jpg`,
              }}
              resizeMode="cover"
              width={wp(25)}
              height={hp(20)}
              className="rounded-md"
            />
          </TouchableOpacity>
          <View className="pt-2 space-y-3">
            <Text className="text-zinc-500" style={{ fontSize: hp(1.6) }}>
              {item.brand}
            </Text>
            <Text className="font-semibold" style={{ fontSize: hp(2.2) }}>
              {item.name}
            </Text>
            <View className="flex-row items-center space-x-1 pt-3">
              <View className="flex-row items-center gap-1">{stars}</View>
              <Text className="text-zinc-500">({item.reviews})</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text
                className="text-zinc-500 line-through"
                style={{ fontSize: hp(1.8) }}
              >
                ₹{item.mrp_price}
              </Text>
              <Text
                className="text-primary  font-semibold"
                style={{ fontSize: hp(1.8) }}
              >
                ₹{item.sale_price}
              </Text>
            </View>
          </View>
        </View>
        {showBag ? (
          <TouchableOpacity
            onPress={() => handleBag(item.id)}
            className="absolute -bottom-2 right-0 p-2 rounded-full bg-primary"
          >
            <Feather name="shopping-bag" size={18} color="white" />
          </TouchableOpacity>
        ) : (
          ""
        )}
        <TouchableOpacity
          onPress={() => removeProductById(item.id)}
          className="absolute top-2 right-0 p-2 "
        >
          <EvilIcons name="close" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavouriteCard;
