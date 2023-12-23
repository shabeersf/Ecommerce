import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { clearWishlist } from "../lib/actions";
import { clearCart } from "../lib/actions/cartsave";

const Profile = () => {
  const navigation = useNavigation();

  const handleCart = async () => {
    await clearCart();
  };
  const handleWishlist = async () => {
    await clearWishlist();
  };
  return (
    <View className="flex-1 justify-center items-center space-y-6">
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="p-2 bg-blue-400"
      >
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCart} className="p-2 bg-blue-400">
        <Text>Clear Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWishlist} className="p-2 bg-blue-400">
        <Text>Clear Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
