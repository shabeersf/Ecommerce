import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignupScreen from "./screens/SignupScreen";
import Profile from "./screens/Profile";
import FavouriteScreen from "./screens/FavouriteScreen";
import BagScreen from "./screens/BagScreen";
import PaymentScreen from "./screens/CheckoutScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import ImageViewerScreen from "./screens/ImageViewerScreen";
import SuccessScreen from "./screens/SuccessScreen";
import { Feather,FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WelcomeScreen from "./screens/WelcomeScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InnerPage() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({focused})=>(
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Feather name="home" size={20} color={focused ? "#FF8181" :"black"}  />
         {
          focused &&  <Text className="text-black" style={{fontSize:hp(1.5)}}>Home</Text>
         }
        </View>)
      }
    }  />
      <Tab.Screen name="Favourite" component={FavouriteScreen} options={{tabBarIcon:({focused})=>(
        <View style={{alignItems:"center",justifyContent:"center"}}>
          {
            focused ? <FontAwesome name="heart" size={20} color={focused ? "#FF8181" :"black"}  /> : <FontAwesome5 name="heart" size={20} color={focused ? "#FF8181" :"black"}  />
          }
         {
          focused &&  <Text className="text-black" style={{fontSize:hp(1.5)}}>Favourites</Text>
         }
        </View>)
      }
    }  />
      <Tab.Screen name="Cart" component={BagScreen} options={{tabBarIcon:({focused})=>(
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Feather name="shopping-bag" size={20} color={focused ? "#FF8181" :"black"}  />
         {
          focused &&  <Text className="text-black" style={{fontSize:hp(1.5)}}>Cart</Text>
         }
        </View>)
      }
    }  />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Checkout" component={PaymentScreen} />
        <Stack.Screen name="Products" component={ProductsListScreen} />
        <Stack.Screen name="Details" component={ProductDetailScreen} />
        <Stack.Screen name="ViewImage" component={ImageViewerScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen
          name="InnerPage"
          component={InnerPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
