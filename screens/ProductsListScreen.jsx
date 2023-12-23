import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import axios from "axios";
import { encode as base64Encode } from "base-64";
import ProductCard from "../components/ProductCard";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  Divider,
  Modal,
  PaperProvider,
  Portal,
  RadioButton,
  TextInput,
} from "react-native-paper";
import { Feather, Entypo } from "@expo/vector-icons";

const ProductsListScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { title } = route.params;
  const [titleValue, setTitleValue] = useState(title ? title : "Products");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [where, setWhere] = useState("");
  const [sort, setSort] = useState("id desc");
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSort = (value) => {
    setSort(value);
    hideModal();
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };
  useFocusEffect(
    useCallback(() => {
      const getProducts = async () => {
        const encodedCredentials = base64Encode(
          `${AUTH_USER}:${AUTH_PASSWORD}`
        );
        try {
          const response = await axios.post(
            `${BaseUrl}/get-full-products.php`,
            {
              where,
              sort,
            },
            {
              headers: {
                Authorization: `Basic ${encodedCredentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          // console.log(response.data.data);
          return response.data.data;
        } catch (error) {
          throw new Error(`Error fetching products: ${error}`);
        }
      };
      const fetchProducts = async () => {
        try {
          const productData = await getProducts();
          setProducts(productData);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchProducts();
    }, [isFocused, where, sort])
  );

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View className="space-y-2">
            <TouchableOpacity className=" p-2 rounded-lg  flex-row items-center">
              <View>
                <RadioButton
                  value="id desc"
                  status={sort === "id desc" ? "checked" : "unchecked"}
                  onPress={() => handleSort("id desc")}
                />
              </View>
              <Text className="">Newest First</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity className=" p-2 rounded-lg flex-row items-center">
              <View>
                <RadioButton
                  value="id asc"
                  status={sort === "id asc" ? "checked" : "unchecked"}
                  onPress={() => handleSort("id asc")}
                />
              </View>
              <Text className="">Oldest First</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity className=" p-2 rounded-lg flex-row items-center">
              <View>
                <RadioButton
                  value="sale_price asc"
                  status={sort === "sale_price asc" ? "checked" : "unchecked"}
                  onPress={() => handleSort("sale_price asc")}
                />
              </View>
              <Text className="">Price-- Low to High</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity className=" p-2 rounded-lg flex-row items-center">
              <View>
                <RadioButton
                  value="sale_price desc"
                  status={sort === "sale_price desc" ? "checked" : "unchecked"}
                  onPress={() => handleSort("sale_price desc")}
                />
              </View>
              <Text className="">Price-- High to Low</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <View className="flex-1 bg-background">
        <View className="flex-1 p-3 flex items-center mt-9 mb-5 ">
          <View className="flex-row justify-between w-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <Text
              className="font-bold mb-2 flex-1 text-center mr-2"
              style={{ fontSize: hp(2.2) }}
            >
              {titleValue}
            </Text>
          </View>
          <View className="flex-row items-center mx-3 px-3 rounded-full bg-[#c6c8ee]">
            <TextInput
              placeholder="Search"
              className="rounded-full flex-1"
              activeUnderlineColor="transparent"
              underlineColor="transparent"
              style={{ backgroundColor: "transparent" }}
              value={where}
              onChangeText={(text) => setWhere(text)}
            />
            {products && (
              <TouchableOpacity
                className="p-2 rounded-full bg-white"
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
                onPress={showModal}
              >
                <Feather name="filter" size={hp(3)} color="#8A8B8C" />
              </TouchableOpacity>
            )}
          </View>
          {products ? (
            <FlatList
              numColumns={2}
              data={products}
              ItemSeparatorComponent={() => (
                <View style={{ width: 20, backgroundColor: "#F9F9F9" }} />
              )}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Image
              source={require("../assets/images/no-data.png")}
              style={{ resizeMode: "contain", width: wp(70) }}
            />
          )}
        </View>
        <StatusBar style="dark" />
      </View>
    </PaperProvider>
  );
};

export default ProductsListScreen;
