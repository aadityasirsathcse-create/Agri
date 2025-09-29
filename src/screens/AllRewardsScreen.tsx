import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AllRewardsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AllRewards'
>;

type Props = {
  navigation: AllRewardsScreenNavigationProp;
};

interface Reward {
  name: string;
  points: string;
  image: any;
  quantity: number;
}

const AllRewardsScreen: React.FC<Props> = ({ navigation }) => {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      name: 'Amazon gift card worth $5000',
      points: '1,200 points',
      image: require('../assets/amazon.png'),
      quantity: 0,
    },
    {
      name: 'Family trip to Cappadocia, Turkey',
      points: '12,000 points',
      image: require('../assets/air.png'),
      quantity: 0,
    },
    {
      name: 'Croma discount coupon - 30% off up to 2,500',
      points: '6,200 points',
      image: require('../assets/chroma.png'),
      quantity: 0,
    },
    {
      name: 'Amazon gift card worth $5000',
      points: '1,200 points',
      image: require('../assets/amazon.png'),
      quantity: 0,
    },
    {
      name: 'Family trip to Cappadocia, Turkey',
      points: '12,000 points',
      image: require('../assets/air.png'),
      quantity: 0,
    },
    {
      name: 'Croma discount coupon - 30% off up to 2,500',
      points: '6,200 points',
      image: require('../assets/chroma.png'),
      quantity: 0,
    },
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState('');


  const handleQuantityChange = (index: number, amount: number) => {
    const newRewards = [...rewards];
    const newQuantity = newRewards[index].quantity + amount;
    if (newQuantity >= 0) {
      newRewards[index].quantity = newQuantity;
      setRewards(newRewards);
    }
  };

  const getPointsFromString = (pointsString: string) => {
    return parseInt(pointsString.replace(/,/g, '').split(' ')[0], 10);
  }

  const selectedRewards = rewards.filter(reward => reward.quantity > 0);
  const totalPointsDeducted = selectedRewards.reduce(
    (sum, reward) => sum + getPointsFromString(reward.points) * reward.quantity,
    0
  );


  const totalQuantity = rewards.reduce((sum, reward) => sum + reward.quantity, 0);

  if (showConfirmation) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowConfirmation(false)}>
                <Image source={require('../assets/back.png')} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rewards</Text>
                <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationTitle}>Confirm Order</Text>
                    <Text style={styles.confirmationInstructions}>
                        Please check your order items before placing order.
                        Once you successfully placed your order, your card request will be processed and delivered to your home address in 4-5 working days.
                    </Text>
                    <Text style={styles.confirmationInstructions}>
                        All the updates regarding your card will be sent to your official e-mail id.
                    </Text>
                    <Text style={styles.orderItemsTitle}>Order Items:</Text>
                    
                    {selectedRewards.map((reward, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Image source={reward.image} style={styles.rewardImage} />
                            <View style={styles.rewardDetails}>
                                <Text style={styles.rewardName}>{reward.name}</Text>
                                <Text style={styles.rewardPoints}>Quantity : {reward.quantity}</Text>
                            </View>
                            <Text style={styles.orderItemPoints}>{getPointsFromString(reward.points) * reward.quantity}</Text>
                        </View>
                    ))}

                    <View style={styles.totalPointsContainer}>
                        <Text style={styles.totalPointsText}>Total Points Deducted :</Text>
                        <Text style={styles.totalPointsValue}>{totalPointsDeducted}</Text>
                    </View>

                    <Text style={styles.emailLabel}>Email ID</Text>
                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
            </ScrollView>
            <View style={styles.redeemButtonContainer}>
                <TouchableOpacity style={styles.redeemButton}>
                    <Text style={styles.redeemButtonText}>Send OTP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/Group.png')} style={styles.navIcon} />

          <Text>Loyalty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/social.png')} style={styles.navIcon} />

          <Text>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/product.png')} style={styles.navIcon} />

          <Text>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/activity.png')} style={styles.navIcon} />

          <Text>My Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/more.png')} style={styles.navIcon} />

          <Text>More</Text>
        </TouchableOpacity>
      </View>
        </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty</Text>
        <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
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
                  onPress={() => handleQuantityChange(index, -1)}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{reward.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(index, 1)}>
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
            onPress={() => setShowConfirmation(true)}>
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/Group.png')} style={styles.navIcon} />

          <Text>Loyalty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/social.png')} style={styles.navIcon} />

          <Text>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/product.png')} style={styles.navIcon} />

          <Text>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/activity.png')} style={styles.navIcon} />

          <Text>My Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/more.png')} style={styles.navIcon} />

          <Text>More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#e5f9e5ff',
  },
  backButton: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  rewardsContainer: {
    // padding: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  rewardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rewardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  rewardName: {
    fontSize: 13,
    //fontWeight: 'bold',
  },
  rewardPoints: {
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#e5f9e5ff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#4CAF50',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  redeemButtonContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  confirmationContainer: {
    padding: 10,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  confirmationInstructions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20
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
    paddingBottom: 20
  },
  orderItemPoints: {
      fontSize: 16,
      fontWeight: 'bold'
  },
  totalPointsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginBottom: 20,
      paddingRight: 10
  },
  totalPointsText: {
    fontSize: 16,
    color: '#666',
  },
  totalPointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emailLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
  },
  emailInput: {
      backgroundColor: '#f7f7f7',
      borderRadius: 5,
      padding: 15,
      fontSize: 16,
      marginBottom: 20
  }
});

export default AllRewardsScreen;
