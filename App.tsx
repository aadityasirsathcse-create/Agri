import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import SetupPinScreen from './src/screens/SetupPinScreen';
import LoyaltyScreen from './src/screens/LoyaltyScreen';
import { SafeAreaView } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Otp: { mobileNumber: string };
  SetupPin: undefined;
  Loyalty: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaView style={{    flex: 1,
    backgroundColor: '#E9F5E9',}}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="SetupPin" component={SetupPinScreen} />
        <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
