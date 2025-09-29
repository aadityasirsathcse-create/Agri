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
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LoyaltyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loyalty'>;

type Props = {
  navigation: LoyaltyScreenNavigationProp;
};

const LoyaltyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require('../assets/user.png')}
            style={styles.userImage}
          />
          <View style={styles.headerText}>
            <Text style={styles.userName}>Harish Ramu</Text>
            <Text style={styles.userRole}>Sales & Marketing</Text>
          </View>
          <View style={styles.headerIcons}>
            <Image source={require('../assets/search.png')} style={styles.navIcon} />
            <Image source={require('../assets/noti.png')} style={styles.navIcon} />
          </View>
        </View>

        <View style={styles.rewardsSummary}>
          <Text style={styles.summaryTitle}>Rewards Summary</Text>
          <View style={styles.summaryContent}>
            <View style={styles.pointsContainer}>
              <Text style={styles.points}>670</Text>
              <Text style={styles.pointsLabel}>Available points</Text>
              <Text style={styles.pointsSubLabel}>Gained through 42 purchases & 4 quiz</Text>
            </View>
            <Image
              source={require('../assets/trophy.png')}
              style={styles.trophyImage}
            />
          </View>
          <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }}></View>
          <View style={styles.pointsBreakdown}>
            <View style={styles.breakdownItem}>
              <Image source={require('../assets/points.png')} style={styles.navIcon} />

              <View>
                <Text style={styles.breakdownValue}>870</Text>
                <Text style={styles.breakdownLabel}>Total Points Earned</Text>
              </View>
            </View>
            <View style={styles.breakdownItem}>
              <Image source={require('../assets/spend.png')} style={styles.navIcon} />

              <View>
                <Text style={styles.breakdownValue}>200</Text>
                <Text style={styles.breakdownLabel}>Total points spent</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('PointsCalculator')}>
    <Image source={require('../assets/cal.png')} style={styles.navIcon} />

                <Text style={styles.actionText}>Points Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('RewardHistory')}>
    <Image source={require('../assets/cal.png')} style={styles.navIcon} />

                <Text style={styles.actionText}>Rewards History</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.rewards}>
          <View style={styles.rewardsHeader}>
            <Text style={styles.rewardsTitle}>Rewards</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllRewards')}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rewardItems}>
            <View style={styles.rewardItem}>
              <Image source={require('../assets/amazon.png')} style={styles.rewardImage} />
              <Text style={styles.rewardName}>Amazon gift card</Text>
              <Text style={styles.rewardValue}>Worth $5000*</Text>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rewardItem}>
              <Image source={require('../assets/air.png')} style={styles.rewardImage} />
              <Text style={styles.rewardName}>Family trip to </Text>
              <Text style={styles.rewardValue}>Worth $5000*</Text>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rewardItem}>
              <Image source={require('../assets/chroma.png')} style={styles.rewardImage} />
              <Text style={styles.rewardName}>Croma discount coupon</Text>
              <Text style={styles.rewardValue}>30% off. Up to 2,500</Text>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Tab Navigator Placeholder */}
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
    scrollView: {
        // flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#e5f9e5ff',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerText: {
        marginLeft: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userRole: {
        color: '#666',
    },
    headerIcons: {
        marginLeft: 'auto',
        flexDirection: 'row',
    },
    rewardsSummary: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    summaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pointsContainer: {},
    points: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    pointsLabel: {
        color: '#666',
    },
    pointsSubLabel: {
        color: '#999',
        fontSize: 12,
    },
    trophyImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    pointsBreakdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20
    },
    breakdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breakdownIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    breakdownValue: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    breakdownLabel: {
        color: '#666',
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15,
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    actionIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    actionText: {
        fontWeight: 'bold',
    },
    rewards: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    rewardsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    rewardsTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    viewAll: {
        color: '#4CAF50',
    },
    rewardItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rewardItem: {
        backgroundColor: '#c3f9c3ff',
        borderRadius: 15,
        padding: 10,
        width: '32%',
        alignItems: 'center',
    },
    rewardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
    },
    rewardName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
        minHeight: 30,
        marginBottom: 5,
    },
    rewardValue: {
        color: '#666',
        textAlign: 'center',
        fontSize: 10,
        minHeight: 22,
        marginBottom: 10,
    },
    claimButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    claimButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
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
        margin:10,
    },
});

export default LoyaltyScreen;