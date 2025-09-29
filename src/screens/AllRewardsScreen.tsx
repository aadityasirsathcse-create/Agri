import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const AllRewardsScreen = () => {
    const navigation = useNavigation();
  const rewards = [
    {
      name: 'Amazon gift card worth $5000',
      points: '1,200 points',
      image: require('../assets/amazon.png'),
    },
    {
      name: 'Family trip to Cappadocia, Turkey',
      points: '12,000 points',
      image: require('../assets/air.png'),
    },
    {
      name: 'Croma discount coupon - 30% off up to 2,500',
      points: '6,200 points',
      image: require('../assets/chroma.png'),
    },
    {
      name: 'Amazon gift card worth $5000',
      points: '1,200 points',
      image: require('../assets/amazon.png'),
    },
    {
      name: 'Family trip to Cappadocia, Turkey',
      points: '12,000 points',
      image: require('../assets/air.png'),
    },
    {
      name: 'Croma discount coupon - 30% off up to 2,500',
      points: '6,200 points',
      image: require('../assets/chroma.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton}/>
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
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>0</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    padding: 20
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
});

export default AllRewardsScreen;
