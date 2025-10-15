import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type AllRewardsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AllRewards'
>;

type Props = {
  navigation: AllRewardsScreenNavigationProp;
};

interface Reward {
  id: number;
  name: string;
  points: string;
  image: any;
  quantity: number;
}

const AllRewardsScreen: React.FC<Props> = ({ navigation }) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState(29);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const fetchRewards = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      const rewardsWithQuantity = data.map((item: any) => ({
        id: item.id,
        name: item.title,
        points: `${Math.floor(item.price * 100)} points`,
        image: { uri: item.image },
        quantity: 0,
      }));

      setRewards(rewardsWithQuantity);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  useEffect(() => {
    let interval: any;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleQuantityChange = (index: number, amount: number) => {
    const newRewards = [...rewards];
    const newQuantity = newRewards[index].quantity + amount;
    if (newQuantity >= 0) {
      newRewards[index].quantity = newQuantity;
      setRewards(newRewards);
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setTimer(29);
  };

  const handlePlaceOrder = () => {
    const isOtpComplete = otp.every(digit => digit !== '');
    setEmail('');
    if (isOtpComplete) {
      setOrderPlaced(true);
    } else {
      alert('Please enter the complete OTP.');
    }
  };

  const handleGoBack = () => {
    setShowConfirmation(false);
    setOtpSent(false);
    setOrderPlaced(false);
    setOtp(new Array(6).fill(''));
    const resetRewards = rewards.map(r => ({ ...r, quantity: 0 }));
    setRewards(resetRewards);
  };

  const handleResendOtp = () => {
    setOtp(new Array(6).fill(''));
    setTimer(29);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    { nativeEvent: { key: keyValue } }: any,
    index: number,
  ) => {
    if (keyValue === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getPointsFromString = (pointsString: string) => {
    return parseInt(pointsString.replace(/,/g, '').split(' ')[0], 10);
  };

  const selectedRewards = rewards.filter(reward => reward.quantity > 0);
  const totalPointsDeducted = selectedRewards.reduce(
    (sum, reward) => sum + getPointsFromString(reward.points) * reward.quantity,
    0,
  );

  const totalQuantity = rewards.reduce(
    (sum, reward) => sum + reward.quantity,
    0,
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loyalty</Text>
          <Icon name="bell-outline" size={24} />
        </View>
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
          {[...Array(9)].map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginBottom: 12,
                padding: 12,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: '#e0e0e0',
                }}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View
                  style={{
                    width: '70%',
                    height: 14,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 5,
                    marginBottom: 8,
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 14,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 5,
                  }}
                />
              </View>
              <View
                style={{
                  width: 80,
                  height: 30,
                  backgroundColor: '#e0e0e0',
                  borderRadius: 5,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (orderPlaced) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Image
            source={require('../assets/success.png')}
            style={styles.successImage}
          />
          <Text style={styles.successTitle}>Order placed successfully</Text>
          <Text style={styles.successMessage}>
            Your order will be processed and delivered to your home address in
            4-5 working days. Check your E-mail inbox for additional details
          </Text>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.goBackButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showConfirmation) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { 
              setShowConfirmation(false);
              setOtpSent(false);
              setEmail("");
              }}>
              <Icon name="arrow-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Rewards</Text>
            <Icon name="bell-outline" size={24} />
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationTitle}>Confirm Order</Text>
              {!otpSent && (
                <>
                  <Text style={styles.confirmationInstructions}>
                    Please check your order items before placing order. Once you
                    successfully placed your order, your card request will be
                    processed and delivered to your home address in 4-5 working
                    days.
                  </Text>
                  <Text style={styles.confirmationInstructions}>
                    All the updates regarding your card will be sent to your
                    official e-mail id.
                  </Text>
                </>
              )}
              <Text style={styles.orderItemsTitle}>Order Items:</Text>

              {selectedRewards.map((reward, index) => (
                <View key={index} style={styles.orderItem}>
                  <Image source={reward.image} style={styles.rewardImage} />
                  <View style={styles.rewardDetails}>
                    <Text style={styles.rewardName}>{reward.name}</Text>
                    <Text style={styles.rewardPoints}>
                      Quantity : {reward.quantity}
                    </Text>
                  </View>
                  <Text style={styles.orderItemPoints}>
                    {getPointsFromString(reward.points) * reward.quantity}
                  </Text>
                </View>
              ))}

              <View style={styles.totalPointsContainer}>
                <Text style={styles.totalPointsText}>
                  Total Points Deducted :
                </Text>
                <Text style={styles.totalPointsValue}>
                  {totalPointsDeducted}
                </Text>
              </View>

              <Text style={styles.title}>Address</Text>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>#916, Gera's imperium rise, hinjewadi phase 2, Pune, Maharashtra - 400057</Text>
                          <TouchableOpacity style={styles.addAddress}>
                          </TouchableOpacity>
                        </View>

              <Text style={styles.emailLabel}>Email ID</Text>
              <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!otpSent}
              />

              {otpSent && (
                <>
                  <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                      00:{timer < 10 ? `0${timer}` : timer}
                    </Text>
                    <TouchableOpacity
                      onPress={handleResendOtp}
                      disabled={timer > 0}
                    >
                      <Text
                        style={
                          timer > 0 ? styles.resendDisabled : styles.resendText
                        }
                      >
                        Resend OTP
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.inputLabel}>Enter OTP</Text>
                  <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={ref => {
                          inputRefs.current[index] = ref;
                        }}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={text => handleOtpChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        value={digit}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
          <View style={styles.redeemButtonContainer}>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={otpSent ? handlePlaceOrder : handleSendOtp}
            >
              <Text style={styles.redeemButtonText}>
                {otpSent ? 'Place Order' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty</Text>
        <Icon name="bell-outline" size={24} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>All available rewards</Text>
          {rewards.map((reward, index) => (
            <View key={index} style={styles.rewardItem}>
              <Image source={reward.image} style={styles.rewardImage} />
              <View style={styles.rewardDetails}>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardPoints}>{reward.points}</Text>
              </View>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(index, -1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{reward.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(index, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {totalQuantity > 0 && (
        <View style={styles.redeemButtonContainer}>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => setShowConfirmation(true)}
          >
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e5f9e5ff', },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#e5f9e5ff',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  rewardsContainer: {},
  rewardsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  rewardImage: { width: 50, height: 50, borderRadius: 25 },
  rewardDetails: { flex: 1, marginLeft: 15 },
  rewardName: { fontSize: 13 },
  rewardPoints: { color: '#666' },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    backgroundColor: '#e5f9e5ff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: { fontSize: 20, color: '#4CAF50' },
  quantityText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 },
  redeemButtonContainer: { backgroundColor: '#FFFFFF', padding: 20 },
  redeemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  redeemButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 },
  confirmationContainer: { padding: 10 },
  confirmationTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  confirmationInstructions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  orderItemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
  },
  orderItemPoints: { fontSize: 16, fontWeight: 'bold' },
  totalPointsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 10,
  },
  totalPointsText: { fontSize: 16, color: '#666' },
  totalPointsValue: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  emailLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  emailInput: {
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timerText: { fontSize: 16, color: '#666' },
  resendText: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
  resendDisabled: { fontSize: 16, color: '#aaa' },
  inputLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  successImage: { width: 100, height: 100, marginBottom: 30 },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  goBackButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  goBackButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 },
  title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addressContainer: {
        marginBottom: 20,
    },
    addressOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    addressText: {
        marginLeft: 10,
        fontSize: 14,
        marginRight:10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    addAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addAddressText: {
        marginLeft: 5,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default AllRewardsScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
