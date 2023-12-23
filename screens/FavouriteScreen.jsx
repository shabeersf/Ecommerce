import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { addToWishlist, getWishlist } from "../lib/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { encode as base64Encode } from "base-64";

import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import axios from "axios";
import FavouriteCard from "../components/FavouriteCard";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

const FavouriteScreen = () => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const [favourite, setFavourite] = useState([]);
  const [productData, setProductData] = useState([]);
  const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);

  const navigation = useNavigation();


  const onDismissSnackBar = () => setVisible(false);
  const snackOpen = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  useFocusEffect(
    useCallback(() => {
      setProductData([])
      const fetchFavourite = async () => {
        const wishlist = await getWishlist();
        if (wishlist && wishlist.length > 0) {
          try {
            setFavourite(wishlist);
            try {
              const response = await axios.post(
                `${BaseUrl}/get-wishlist.php`,
                {
                  wishlist,
                },
                {
                  headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );

              // console.log(response.data.data)
              const data = await response.data.data;
              // return;
              if (data) {
                setProductData(data);
              }
            } catch (error) {
              console.error("No data found:");
            }
          } catch (error) {
            console.error("Error fetching wishlist:", error);
          }
        }
      };

      fetchFavourite();
      setIsLoading(true);

      Promise.all([fetchFavourite()]).then(() => {
        // When both fetches are completed, set loading to false
        setIsLoading(false);
      });
  
    }, [isFocused])
  );

  const removeProductById = async (productId) => {
    const updatedProductData = productData.filter(
      (item) => item.id !== productId
    );
    setProductData(updatedProductData);
    await addToWishlist(productId);
  };

  return (
    <View className="flex-1 bg-background">
      {
        isLoading ? (<View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="red" />
      </View>) : (
          <>
          <View className="flex-1 p-3 flex items-center mt-9 mb-5 ">
        <Text className="font-bold mb-2" style={{ fontSize: hp(2.2) }}>
          Favourites
        </Text>
        {favourite && favourite.length > 0 && productData &&
              productData.length > 0? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {productData &&
              productData.length > 0 &&
              productData.map((item,index) => {
                return (
                  <FavouriteCard
                    key={item.id}
                    item={item}
                    indexValue={index}
                    snackOpen={snackOpen}
                    removeProductById={removeProductById}
                  />
                );
              })}
          </ScrollView>
        ) : (
          <Image
            source={require("../assets/images/no-data.png")}
            style={{ resizeMode: "contain", width: wp(70) }}
          />
        )}
      </View>
      <StatusBar style="dark" />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "View Cart",
          onPress: () => {
            navigation.navigate("Cart")
          },
        }}
      >
        Item Added to the bag
      </Snackbar>
          </>
        )
      }
    </View>
  );
};

export default FavouriteScreen;
