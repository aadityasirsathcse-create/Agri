import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LoyaltyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loyalty'
>;

type Reward = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Props = {
  navigation: LoyaltyScreenNavigationProp;
};

const LoyaltyScreen: React.FC<Props> = ({ navigation }) => {
  const [availablePoints, setAvailablePoints] = useState<number | null>(null);
  const [totalEarned, setTotalEarned] = useState<number | null>(null);
  const [totalSpent, setTotalSpent] = useState<number | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const isFocused = useIsFocused();
  const isMounted = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        fetchRandomNumbers();
        fetchRewards(1, true);
      }
      isMounted.current = true;
    }, [isFocused]),
  );

  const fetchRandomNumbers = async () => {
    try {
      const response = await fetch(
        'https://www.random.org/integers/?num=3&min=100&max=1000&col=1&base=10&format=plain&rnd=new',
      );
      const text = await response.text();
      const [a, b, c] = text.trim().split('\n').map(Number);
      setAvailablePoints(a);
      setTotalEarned(b);
      setTotalSpent(c);
    } catch (error) {
      console.error('Error fetching random numbers:', error);
      setAvailablePoints(0);
      setTotalEarned(0);
      setTotalSpent(0);
    }
  };

  const fetchRewards = async (pageNum = page, reset = false) => {
    if (!hasMore) return;

    setLoadingInitial(true);

    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();

      const start = (pageNum - 1) * 5;
      const end = start + 5;
      const pagedData = data.slice(start, end);

      if (pagedData.length === 0) {
        setHasMore(false);
      } else {
        setRewards(prev => (reset ? pagedData : [...prev, ...pagedData]));
        setPage(pageNum + 1);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setLoadingInitial(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingInitial && hasMore) {
      fetchRewards(page);
    }
  };

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
            <Icon name="magnify" size={24} />
            <Icon name="bell-outline" size={24} />
          </View>
        </View>

        <View style={styles.rewardsSummary}>
          <Text style={styles.summaryTitle}>Rewards Summary</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <View style={styles.summaryContent}>
              <View style={styles.pointsContainer}>
                <Text style={styles.points}>{availablePoints}</Text>
                <Text style={styles.pointsLabel}>Available points</Text>
                <Text style={styles.pointsSubLabel}></Text>
              </View>
              <Image
                source={require('../assets/trophy.png')}
                style={styles.trophyImage}
              />
            </View>
          )}

          <View
            style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }}
          />

          {loading ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            <View style={styles.pointsBreakdown}>
              <View style={styles.breakdownItem}>
                <Image
                  source={require('../assets/points.png')}
                  style={styles.navIcon}
                />
                <View>
                  <Text style={styles.breakdownValue}>{totalEarned}</Text>
                  <Text style={styles.breakdownLabel}>Total Points Earned</Text>
                </View>
              </View>
              <View style={styles.breakdownItem}>
                <Image
                  source={require('../assets/spend.png')}
                  style={styles.navIcon}
                />
                <View>
                  <Text style={styles.breakdownValue}>{totalSpent}</Text>
                  <Text style={styles.breakdownLabel}>Total Points Spent</Text>
                </View>
              </View>
            </View>
          )}

          {/* <TouchableOpacity
            onPress={fetchRandomNumbers}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: '#4CAF50', textAlign: 'center' }}>
              ↻ Refresh Points
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('PointsCalculator')}
          >
            <Image
              source={require('../assets/cal.png')}
              style={styles.navIcon}
            />

            <Text style={styles.actionText}>Points Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('RewardHistory')}
          >
            <Image
              source={require('../assets/cal.png')}
              style={styles.navIcon}
            />

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

          <FlatList
            horizontal
            data={rewards}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rewardItems}
            renderItem={({ item }) => (
              <View style={styles.rewardItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.rewardImage}
                  resizeMode="contain"
                />
                <Text style={styles.rewardName} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.rewardValue}>${item.price}</Text>
                <TouchableOpacity
                  style={styles.claimButton}
                  onPress={() => navigation.navigate('AllRewards')}
                >
                  <Text style={styles.claimButtonText}>Claim</Text>
                </TouchableOpacity>
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingInitial && hasMore ? (
                <ActivityIndicator size="small" color="#4CAF50" />
              ) : null
            }
          />
        </View>
      </ScrollView>
      {/* Bottom Tab Navigator Placeholder
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Loyalty')}
        >
          <Icon name="trophy-outline" size={24} style={styles.navIcon} />
          <Text style={{ color: '#4CAF50' }}>Loyalty</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Social')}
        >
          <Icon name="account-group-outline" size={24} style={styles.navIcon} />
          <Text>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Products')}
        >
          <Icon name="store-outline" size={24} style={styles.navIcon} />
          <Text>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon
            name="clipboard-text-outline"
            size={24}
            style={styles.navIcon}
          />
          <Text>My Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="dots-horizontal" size={24} style={styles.navIcon} />
          <Text>More</Text>
        </TouchableOpacity>
      </View> */}
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
    paddingHorizontal: 15,
    paddingVertical: 40,
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
    fontSize: 14,
  },
  userRole: {
    color: '#666',
  },
  headerIcons: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 10,
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
    paddingHorizontal: 20,
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
  rewardContainer: {
    marginVertical: 1,
  },
  rewardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardItem: {
    backgroundColor: '#c3f9c3ff',
    borderRadius: 15,
    padding: 10,
    width: 140,
    alignItems: 'center',
    margin: 6,
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
    margin: 10,
    marginLeft: 3,
  },
});

export default LoyaltyScreen;
