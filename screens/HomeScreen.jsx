import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { encode as base64Encode } from "base-64";
import ProductCard from "../components/ProductCard";
import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import HomeSlider from "../components/HomeSlider";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [slider, setSlider] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused();



  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
    const getProducts = async () => {
      const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);
      try {
        const response = await axios.post(
          `${BaseUrl}/get-products.php`,
          null,
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(`Error fetching products: ${error}`);
      }
    };
    const getSliders = async () => {
      const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);
      try {
        const response = await axios.post(
          `${BaseUrl}/get-slider-home.php`,
          null,
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(`Error fetching slider: ${error}`);
      }
    };

    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        setProducts(productData)
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchSlider = async () => {
      try {
        const sliderData = await getSliders();
        setSlider(sliderData)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
    fetchSlider();
    setIsLoading(true);

    Promise.all([fetchProducts(), fetchSlider()]).then(() => {
      // When both fetches are completed, set loading to false
      setIsLoading(false);
    });
  }, [isFocused])
  )
isLoading 
  return (
    <View className="flex-1 bg-background">
      {
        isLoading ? (<View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
        </View>) : (
          <>
          <ScrollView className="flex-1">
      {
            slider && <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={slider}
            ItemSeparatorComponent={() => <View style={{ width: 20,backgroundColor:"#F9F9F9" }} />}
            renderItem={({item}) => <HomeSlider item={item} />}
            keyExtractor={item => item.id}
            
          />
          }
        <View>
          <View className="flex-row items-center justify-between p-3">
            <Text className="font-bold" style={{ fontSize: hp(3.5) }}>
              Sale
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Products",{
              title:"Sale",
            })}>
              <Text style={{ fontSize: hp(1.6) }}>View All</Text>
            </TouchableOpacity>
          </View>
          {
            products && <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products}
            ItemSeparatorComponent={() => <View style={{ width: 20,backgroundColor:"#F9F9F9" }} />}
            renderItem={({item}) => <ProductCard item={item} />}
            keyExtractor={item => item.id}
          />
          }
        </View>
        <View>
          <View className="flex-row items-center justify-between p-3">
            <Text className="font-bold" style={{ fontSize: hp(3.5) }}>
              New
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Products",{
              title:"New",
            })}>
              <Text style={{ fontSize: hp(1.6) }}>View All</Text>
            </TouchableOpacity>
          </View>
          {
            products && <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products}
            ItemSeparatorComponent={() => <View style={{ width: 20,backgroundColor:"#F9F9F9" }} />}
            renderItem={({item}) => <ProductCard item={item} />}
            keyExtractor={item => item.id}
          />
          }
        </View>
      </ScrollView>
      <StatusBar style="light" />
          </>
        )
      }
    </View>
  );
};

export default HomeScreen;
