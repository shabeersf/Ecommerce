import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { encode as base64Encode } from "base-64";
import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import axios from "axios";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DetailCard from "../components/DetailCard";
import { addToWishlist, checkIfInWishlist } from "../lib/actions";
import { Snackbar } from "react-native-paper";
import { addToCart, checkIfInCart } from "../lib/actions/cartsave";

const ProductDetailScreen = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [heartActive, setHeartActive] = useState(false);
  const { id } = route.params;
  const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [showBag, setSetshowBag] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setProductData([]);
      const fetchProduct = async () => {
        if (id) {
          try {
            try {
              const response = await axios.post(
                `${BaseUrl}/product-details.php`,
                {
                  id,
                },
                {
                  headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );

              console.log(response.data.data.product_info);
              const data = await response.data.data.product_info;
              // return;
              if (data) {
                setProductData(data);
                const isInWishlist = await checkIfInWishlist(id);
                setHeartActive(isInWishlist);
              }
            } catch (error) {
              console.error("No data found:");
            }
          } catch (error) {
            console.error("Error fetching wishlist:", error);
          }
        }
      };

      const checkCart = async () => {
        const isInCart = await checkIfInCart(id);

        if (isInCart) {
          setSetshowBag(false);
        }
      };
      fetchProduct();
      checkCart();

      Promise.all([fetchProduct()]).then(() => {
        // When both fetches are completed, set loading to false
        setIsLoading(false);
      });
    }, [isFocused])
  );
  const handleHeart = async (id) => {
    setHeartActive(!heartActive);
    await addToWishlist(id);
  };
  const handleBag = async (id) => {
    setSetshowBag(false);
    snackOpen();
    await addToCart(productData);
  };
  const stars = [];

  for (let i = 0; i < productData.rating; i++) {
    stars.push(<FontAwesome key={i} name="star" size={15} color="#FFBA49" />);
  }
  const snackOpen = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View className="flex-1 bg-background">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
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
                {productData.category}
              </Text>
            </View>
            {productData && (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {productData.product_img &&
                    productData.product_img.length > 0 && (
                      <FlatList
                        horizontal
                        data={productData.product_img}
                        ItemSeparatorComponent={() => (
                          <View
                            style={{ width: 5, backgroundColor: "#F9F9F9" }}
                          />
                        )}
                        renderItem={({ item }) => (
                          <DetailCard item={item} name={productData.name} />
                        )}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  <View className="flex-1 space-y-3 p-3">
                    <View className="w-full flex-row justify-center mt-3 items-center">
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
                        className=" p-2 bg-white shadow-xl rounded-full"
                        onPress={() => handleHeart(productData.id)}
                      >
                        {heartActive ? (
                          <FontAwesome name="heart" size={20} color="red" />
                        ) : (
                          <FontAwesome5 name="heart" size={20} color="black" />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text
                        className="font-semibold"
                        style={{ fontSize: hp(2.2) }}
                      >
                        {productData.name}
                      </Text>
                      <Text
                        className="font-semibold"
                        style={{ fontSize: hp(2.2) }}
                      >
                        ₹{productData.sale_price}
                      </Text>
                    </View>
                    <Text
                      className="text-zinc-500"
                      style={{ fontSize: hp(1.6) }}
                    >
                      {productData.brand}
                    </Text>
                    <View className="flex-row items-center space-x-1 pt-3">
                      <View className="flex-row items-center gap-1">
                        {stars}
                      </View>
                      <Text className="text-zinc-500">
                        ({productData.reviews})
                      </Text>
                    </View>
                    <Text
                      className="text-black font-semibold"
                      style={{ fontSize: hp(1.8) }}
                    >
                      {productData.description}
                    </Text>
                  </View>
                </ScrollView>
                <View className="flex justify-center items-center">
                  <TouchableOpacity
                    onPress={
                      !showBag ? () => navigation.navigate("Cart") : handleBag
                    }
                    className="p-3 bg-primary rounded-full"
                    style={{ width: wp(80) }}
                  >
                    <Text
                      className="text-white w-full text-center"
                      style={{ fontSize: hp(2.2) }}
                    >
                      {!showBag ? "View Cart" : "Add to Cart"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </>
      )}
      <StatusBar style="dark" />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "View Cart",
          onPress: () => {
            navigation.navigate("Cart");
          },
        }}
      >
        Item Added to the bag
      </Snackbar>
    </View>
  );
};

export default ProductDetailScreen;
