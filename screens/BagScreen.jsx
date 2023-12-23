import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { encode as base64Encode } from "base-64";
import {  useSelector } from "react-redux";
import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import axios from "axios";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { getCart, getCartIds } from "../lib/actions/cartsave";
import BagCard from "../components/BagCard";
const BagScreen = () => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [bag, setBag] = useState([]);
  const [productData, setProductData] = useState([]);
  const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setProductData([]);
      setTotal(0);
      const fetchBag = async () => {
        const baged = await getCartIds();
        const bageds = await getCart();
        // console.log(bageds);
        if (bageds.length > 0) {
          let calculatedTotal = 0;

          bageds.forEach((bagItem) => {
            calculatedTotal += bagItem.quantity * bagItem.sale_price;
          });

          setTotal(calculatedTotal);
        }
        if (baged && baged.length > 0) {
          try {
            setBag(baged);
            try {
              const response = await axios.post(
                `${BaseUrl}/get-carts.php`,
                {
                  baged,
                },
                {
                  headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );

              // console.log(response.data)
              const data = await response.data.data;
              // return;
              if (data) {
                setProductData(data);
              }
            } catch (error) {
              console.error("No data found:");
            }
          } catch (error) {
            console.error("Error fetching cart:", error);
          }
        }
      };

      fetchBag();
      setIsLoading(true);

      Promise.all([fetchBag()]).then(() => {
        // When both fetches are completed, set loading to false
        setIsLoading(false);
      });
    }, [isFocused])
  );
  const user = useSelector((state) => state.auth.user);
  const handleCheckout = () => {
    if (user) {
      navigation.navigate("Success");
    }
    else
    {
      navigation.navigate("Login");
    }
  };
  return (
    <View className="flex-1 bg-background">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <View className="flex-1 p-3 flex items-center mt-9 mb-5 ">
            <Text className="font-bold mb-2" style={{ fontSize: hp(2.2) }}>
              My Bag
            </Text>
            {bag && bag.length > 0 && productData && productData.length > 0 ? (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ height: hp(65) }}
                >
                  {productData &&
                    productData.length > 0 &&
                    productData.map((item, index) => {
                      return (
                        <BagCard
                          key={item.id}
                          item={item}
                          total={total}
                          setTotal={setTotal}
                        />
                      );
                    })}
                </ScrollView>
                <View
                  className=" flex-1 pb-3"
                  style={{
                    shadowColor: "red",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,

                    elevation: 2,
                    width: wp(100),
                    height: hp(28),
                  }}
                >
                  <View className="p-2 space-y-3">
                    <View className="flex-row justify-between items-center">
                      <Text
                        className="text-zinc-500"
                        style={{ fontSize: hp(1.8) }}
                      >
                        Total Amount :
                      </Text>
                      <Text className="font-bold" style={{ fontSize: hp(2) }}>
                        ₹{total}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleCheckout} className="p-3  bg-primary rounded-full">
                      <Text
                        className="text-center text-white font-bold"
                        style={{ fontSize: hp(2) }}
                      >
                        Checkout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <Image
                source={require("../assets/images/no-data.png")}
                style={{ resizeMode: "contain", width: wp(70) }}
              />
            )}
          </View>
          <StatusBar style="dark" />
        </>
      )}
    </View>
  );
};

export default BagScreen;
