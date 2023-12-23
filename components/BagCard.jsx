import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ImageUrl } from "../baseData";
import { Entypo } from "@expo/vector-icons";
import { addToCart, getCartItem } from "../lib/actions/cartsave";
import { useNavigation } from "@react-navigation/native";

const BagCard = ({ item, setTotal, total }) => {
  const navigation = useNavigation();

  const [itemCart, setItemCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const checkBag = async () => {
      const cartItem = await getCartItem(item.id);

      if (cartItem) {
        setItemCart(cartItem);
        setQuantity(cartItem.quantity); // Update state with the retrieved cart item
      } else {
        // If the item is not in the cart, initialize it with default quantity
        setItemCart({ ...item, quantity: 0 });
      }
    };
    checkBag();
  }, [handleCartPlus, handleCartMinus, item.id]);

  const handleCartPlus = async () => {
    const updatedQuantity = quantity + 1;
    await addToCart(item, updatedQuantity);
    setQuantity(updatedQuantity);
    setTotal(parseFloat(total) + parseFloat(item.sale_price)); // Ensure 'total' is treated as a number
  };

  const handleCartMinus = async () => {
    if (quantity > 0) {
      const updatedQuantity = quantity - 1;
      await addToCart(item, updatedQuantity);
      setQuantity(updatedQuantity);
      setTotal(parseFloat(total) - parseFloat(item.sale_price)); // Ensure 'total' is treated as a number
    }
  };

  return (
    <View className="flex-1 mb-3" style={{ width: wp(90) }}>
      <View
        className="relative w-full flex-1 bg-white pr-2  rounded-lg"
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
          <TouchableOpacity onPress={()=>navigation.navigate("Details",{id:item.id})}>
            <Image
              source={{
                uri: `${ImageUrl}/photos/orginal/${item.image}.jpg`,
              }}
              resizeMode="cover"
              width={wp(25)}
              height={hp(20)}
            />
          </TouchableOpacity>
          <View className="pt-2 space-y-2">
            <Text className="font-semibold" style={{ fontSize: hp(2.2) }}>
              {item.name}
            </Text>
            <Text className="text-zinc-500" style={{ fontSize: hp(1.6) }}>
              {item.brand}
            </Text>

            <View className="flex-row items-center gap-1">
              <Text
                className="text-zinc-500 line-through"
                style={{ fontSize: hp(1.8) }}
              >
                ₹{item.mrp_price * quantity}
              </Text>
              <Text
                className="text-primary  font-semibold"
                style={{ fontSize: hp(1.8) }}
              >
                ₹{item.sale_price * quantity}
              </Text>
            </View>
            <View className="flex-row items-center space-x-2 pt-3">
              <TouchableOpacity
                onPress={() => handleCartMinus(item.id)}
                disabled={quantity === 1 ? true : false}
                className="p-2 bg-white rounded-full"
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
                <Entypo name="minus" size={20} color="black" />
              </TouchableOpacity>
              <Text className="text-zinc-500">({quantity})</Text>
              <TouchableOpacity
                onPress={() => handleCartPlus(item.id)}
                className="p-2 bg-white rounded-full"
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
                <Entypo name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BagCard;
