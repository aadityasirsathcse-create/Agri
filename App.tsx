import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import SetupPinScreen from './src/screens/SetupPinScreen';
import LoyaltyScreen from './src/screens/LoyaltyScreen';
import AllRewardsScreen from './src/screens/AllRewardsScreen';
import PointsCalculatorScreen from './src/screens/PointsCalculatorScreen';
import RewardHistoryScreen from './src/screens/RewardHistoryScreen';
import SocialScreen from './src/screens/SocialScreen';
import CommentScreen from './src/screens/CommentScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentProcessingScreen from './src/screens/PaymentProcessingScreen';
import OrderPlacedScreen from './src/screens/OrderPlacedScreen';
import { SafeAreaView } from 'react-native';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  sizes: string[];
}

export type RootStackParamList = {
  Login: undefined;
  Otp: { mobileNumber: string };
  SetupPin: undefined;
  Loyalty: undefined;
  AllRewards: undefined;
  PointsCalculator: undefined;
  RewardHistory: undefined;
  Social: undefined;
  Comments: { post: any };
  CreatePost: undefined;
  Products: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
  PaymentProcessing: undefined;
  OrderPlaced: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E9F5E9' }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="SetupPin" component={SetupPinScreen} />
          <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
          <Stack.Screen name="AllRewards" component={AllRewardsScreen} />
          <Stack.Screen name="PointsCalculator" component={PointsCalculatorScreen} />
          <Stack.Screen name="RewardHistory" component={RewardHistoryScreen} />
          <Stack.Screen name="Social" component={SocialScreen} />
          <Stack.Screen name="Comments" component={CommentScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="PaymentProcessing" component={PaymentProcessingScreen} />
          <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
