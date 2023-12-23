import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../context/features/auth/authSlice";
import { encode as base64Encode } from "base-64";

import { AUTH_PASSWORD, AUTH_USER, BaseUrl } from "../baseData";
import axios from "axios";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const user = useSelector((state) => state.auth.user);
  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.navigate("InnerPage");
      }
    }, [user])
  );

  const handleSubmit = async () => {
    if (email.length > 0 && password.length > 0 && name.length > 0) {
      const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);
      dispatch(loginStart());
      try {
        const response = await axios.post(
          `${BaseUrl}/sign-up.php`,
          {
            email,
            password,
            name,
          },
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = await response.data.data;

        if (response.status === 200) {
          dispatch(loginSuccess(data));
          // console.log(data);
          navigation.navigate("InnerPage");
        }
      } catch (error) {
        dispatch(loginFailure("User already exist"));

        // dispatch(loginFailure("Already exist"));
        Alert.alert(
          "User already exist",
          "The provided email is exist with us.please login."
        );
      }
    } else {
      Alert.alert(
        "Missing Information",
        "Please provide your name, email and password to log in."
      );
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 p-3 flex justify-between mt-9 mb-5 ">
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{ fontSize: hp(4.5) }}
            className="font-bold tracking-widest"
          >
            Signup
          </Text>
        </View>
        <View className="space-y-5">
          <View
            className="bg-white p-2 py-1"
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
            <TextInput
              autoCapitalize="none"
              className={`w-full py-2 bg-white text-black`}
              activeUnderlineColor="blue"
              underlineColor="transparent"
              label="Name"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View
            className="bg-white p-2 py-1"
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
            <TextInput
              autoCapitalize="none"
              className={`w-full py-2 bg-white text-black`}
              activeUnderlineColor="blue"
              underlineColor="transparent"
              label="Email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View
            className="bg-white p-2 py-1"
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
            <TextInput
              autoCapitalize="none"
              className={`w-full py-2 bg-white text-black`}
              activeUnderlineColor="blue"
              underlineColor="transparent"
              label="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View className="space-y-4">
            <TouchableOpacity
              className="flex-row justify-end gap-2 my-2"
              onPress={() => navigation.navigate("Login")}
            >
              <Text>Already have an account?</Text>
              <FontAwesome name="long-arrow-right" size={20} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="p-3 bg-primary rounded-full"
            >
              <Text
                className="text-white text-center"
                style={{ fontSize: hp(2.2) }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="space-y-3">
          <Text style={{ fontSize: hp(1.9) }} className="text-center">
            Or login with social account
          </Text>
          <View className="flex-row gap-4 justify-center">
            <TouchableOpacity className="shadow-lg bg-white rounded-md p-2 px-3">
              <Image source={require("../assets/images/google.png")} />
            </TouchableOpacity>
            <TouchableOpacity className="shadow-lg bg-white rounded-md p-2 px-3">
              <Image source={require("../assets/images/apple.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default SignupScreen;
