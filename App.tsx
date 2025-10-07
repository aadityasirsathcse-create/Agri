
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import store from './src/store';

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
import OrdersHistoryScreen from './src/screens/OrdersHistoryScreen';
import OrderFilterScreen from './src/screens/OrderFilterScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import AcknowledgementScreen from './src/screens/AcknowledgementScreen';
import AcknowledgementSuccessScreen from './src/screens/AcknowledgementSuccessScreen';
import MyActivitiesScreen from './src/screens/MyActivitiesScreen';
import MoreScreen from './src/screens/MoreScreen';
import ManageFarmersScreen from './src/screens/ManageFarmersScreen';
import ManageRetailersScreen from './src/screens/ManageRetailersScreen';
import AddFarmerScreen from './src/screens/AddFarmerScreen';
import AddRetailerScreen from './src/screens/AddRetailerScreen';
import UpdateDistributorScreen from './src/screens/UpdateDistributorScreen';
import UpdateDistributorDetailScreen from './src/screens/UpdateDistributorDetailScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';
import MyComplaintsScreen from './src/screens/MyComplaintsScreen';
import RaiseComplaintScreen from './src/screens/RaiseComplaintScreen';
import TicketDetailScreen from './src/screens/TicketDetailScreen';
import MyExpensesScreen from './src/screens/MyExpensesScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import RetailerHomeScreen from './src/screens/RetailerHomeScreen';
import RetailerScanScreen from './src/screens/RetailerScanScreen';
import RetailerSubmitOrderScreen from './src/screens/RetailerSubmitOrder';
import SuccessScreen from './src/screens/SuccessScreen';
import DealerInventoryScreen from './src/screens/DealerInventoryScreen';
import DealerScanScreen from './src/screens/DealerScanScreen';
import DealerQRDetailScreen from './src/screens/DealerQRDetailScreen';
import DealerSuccessScreen from './src/screens/DealerSuccessScreen';
import { SafeAreaView } from 'react-native';
import QRTrackerSalesScreen from './src/plugins/qr-tracker/screens/QRTrackerSalesScreen';
import QRTrackerOrderDetailScreen from './src/plugins/qr-tracker/screens/QRTrackerOrderDetailScreen';
import QRTrackerReportProductScreen from './src/plugins/qr-tracker/screens/QRTrackerReportProductScreen';
import QRTrackerScanScreen from './src/plugins/qr-tracker/screens/QRTrackerScanScreen';
import QRTrackerSuccessScreen from './src/plugins/qr-tracker/screens/QRTrackerSuccessScreen';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  sizes: string[];
}

export interface CFProduct {
    id: string;
    name: string;
    batch: string;
    size: string;
    shippers: number;
    scanned: number;
  }

export type RootStackParamList = {
  Login: undefined;
  Otp: { mobileNumber: string };
  SetupPin: undefined;
  Main: undefined;
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
  OrdersHistory: undefined;
  OrderFilter: undefined;
  OrderDetail: { orderId: string };
  Acknowledgement: { orderId: string };
  AcknowledgementSuccess: undefined;
  MyActivities: undefined;
  More: undefined;
  ManageFarmers: undefined;
  ManageRetailers: undefined;
  AddFarmer: undefined;
  AddRetailer: undefined;
  UpdateDistributor: undefined;
  UpdateDistributorDetail: undefined;
  AddActivity: undefined;
  MyComplaints: undefined;
  RaiseComplaint: undefined;
  TicketDetail: undefined;
  MyExpenses: undefined;
  AddExpense: undefined;
  Analytics: undefined;
  CFSales: undefined;
  CFOrderDetail: { product?: CFProduct };
  CFReportProduct: { product: CFProduct; scannedBarcode?: string; timestamp?: number };
  CFScan: { product: CFProduct };
  CFSuccess: undefined;
  RetailerHome: undefined;
  RetailerScan: undefined;
  RetailerSubmitOrder: { showConfirm?: boolean };
  Success: undefined;
  DealerInventory: undefined;
  DealerScan: undefined;
  DealerQRDetail: { showConfirm?: boolean };
  DealerSuccess: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = 'circle-outline';

        if (route.name === 'Loyalty') {
          iconName = 'trophy-outline';
        } else if (route.name === 'Social') {
          iconName = 'comment-text-multiple-outline';
        } else if (route.name === 'Products') {
          iconName = 'cube-outline';
        } else if (route.name === 'MyActivities') {
          iconName = 'format-list-bulleted';
        } else if (route.name === 'More') {
          iconName = 'dots-horizontal';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Loyalty" component={LoyaltyScreen} />
    <Tab.Screen name="Social" component={SocialScreen} />
    <Tab.Screen name="Products" component={ProductsScreen} />
    <Tab.Screen name="MyActivities" component={MyActivitiesScreen} options={{ title: 'My Activities'}} />
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E9F5E9' }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="SetupPin" component={SetupPinScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="AllRewards" component={AllRewardsScreen} />
            <Stack.Screen name="PointsCalculator" component={PointsCalculatorScreen} />
            <Stack.Screen name="RewardHistory" component={RewardHistoryScreen} />
            <Stack.Screen name="Comments" component={CommentScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="PaymentProcessing" component={PaymentProcessingScreen} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
            <Stack.Screen name="OrdersHistory" component={OrdersHistoryScreen} />
            <Stack.Screen name="OrderFilter" component={OrderFilterScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="Acknowledgement" component={AcknowledgementScreen} />
            <Stack.Screen name="AcknowledgementSuccess" component={AcknowledgementSuccessScreen} />
            <Stack.Screen name="ManageFarmers" component={ManageFarmersScreen} />
            <Stack.Screen name="ManageRetailers" component={ManageRetailersScreen} />
            <Stack.Screen name="AddFarmer" component={AddFarmerScreen} />
            <Stack.Screen name="AddRetailer" component={AddRetailerScreen} />
            <Stack.Screen name="UpdateDistributor" component={UpdateDistributorScreen} />
            <Stack.Screen name="UpdateDistributorDetail" component={UpdateDistributorDetailScreen} />
            <Stack.Screen name="AddActivity" component={AddActivityScreen} />
            <Stack.Screen name="MyComplaints" component={MyComplaintsScreen} />
            <Stack.Screen name="RaiseComplaint" component={RaiseComplaintScreen} />
            <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
            <Stack.Screen name="MyExpenses" component={MyExpensesScreen} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="CFSales" component={QRTrackerSalesScreen} />
            <Stack.Screen name="CFOrderDetail" component={QRTrackerOrderDetailScreen} />
            <Stack.Screen name="CFReportProduct" component={QRTrackerReportProductScreen} />
            <Stack.Screen name="CFScan" component={QRTrackerScanScreen} />
            <Stack.Screen name="CFSuccess" component={QRTrackerSuccessScreen} />
            <Stack.Screen name="RetailerHome" component={RetailerHomeScreen} />
            <Stack.Screen name="RetailerScan" component={RetailerScanScreen} />
            <Stack.Screen name="RetailerSubmitOrder" component={RetailerSubmitOrderScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="DealerInventory" component={DealerInventoryScreen} />
            <Stack.Screen name="DealerScan" component={DealerScanScreen} />
            <Stack.Screen name="DealerQRDetail" component={DealerQRDetailScreen} />
            <Stack.Screen name="DealerSuccess" component={DealerSuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
