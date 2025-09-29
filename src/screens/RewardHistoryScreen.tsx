import React, { useState } from 'react';
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

type RewardHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RewardHistory'
>;

type Props = {
  navigation: RewardHistoryScreenNavigationProp;
};

interface HistoryItem {
  name: string;
  status: 'Waiting for approval' | 'Approved';
  image: any;
  trackingId: string;
  points: number;
  email: string;
  claimedDate: string;
  approvedDate: string;
}

const RewardHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const historyItems: HistoryItem[] = [
    {
      name: 'Amazon gift card',
      status: 'Waiting for approval',
      image: require('../assets/amazon.png'),
      trackingId: '01AGC9378288899',
      points: 1200,
      email: 'ajith.kumar@company.com',
      claimedDate: '12 March 2023',
      approvedDate: '-',
    },
    {
      name: 'Croma gift card worth 10,000',
      status: 'Approved',
      image: require('../assets/chroma.png'),
      trackingId: '01AGC9378288899',
      points: 10000,
      email: 'ajith.kumar@company.com',
      claimedDate: '11 March 2023',
      approvedDate: '12 March 2023',
    },
    {
      name: 'Amazon gift card',
      status: 'Waiting for approval',
      image: require('../assets/amazon.png'),
      trackingId: '01AGC9378288899',
      points: 1200,
      email: 'ajith.kumar@company.com',
      claimedDate: '12 March 2023',
      approvedDate: '-',
    },
    {
      name: 'Croma gift card worth 10,000',
      status: 'Approved',
      image: require('../assets/chroma.png'),
      trackingId: '01AGC9378288899',
      points: 10000,
      email: 'ajith.kumar@company.com',
      claimedDate: '11 March 2023',
      approvedDate: '12 March 2023',
    },
    {
        name: 'Amazon gift card',
        status: 'Waiting for approval',
        image: require('../assets/amazon.png'),
        trackingId: '01AGC9378288899',
        points: 1200,
        email: 'ajith.kumar@company.com',
        claimedDate: '12 March 2023',
        approvedDate: '-',
      },
      {
        name: 'Croma gift card worth 10,000',
        status: 'Waiting for approval',
        image: require('../assets/chroma.png'),
        trackingId: '01AGC9378288899',
        points: 10000,
        email: 'ajith.kumar@company.com',
        claimedDate: '11 March 2023',
        approvedDate: '-',
      },
  ];

  const totalHistory = historyItems.length;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Purchase History ({totalHistory})</Text>
          {historyItems.map((item, index) => (
            <View key={index} style={styles.historyItemWrapper}>
              <View style={styles.historyItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemStatus}>
                    Status : <Text style={item.status === 'Approved' ? styles.approved : styles.waiting}>{item.status}</Text>
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                  <Image 
                    source={expandedIndex === index ? require('../assets/up_arrow.png') : require('../assets/down_arrow.png')} 
                    style={styles.arrowIcon} 
                  />
                </TouchableOpacity>
              </View>
              {expandedIndex === index && (
                <View style={styles.expandedDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tracking ID</Text>
                    <Text style={styles.detailValue}>: {item.trackingId}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Points deducted</Text>
                    <Text style={styles.detailValue}>: {item.points}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Contact E-mail</Text>
                    <Text style={styles.detailValue}>: {item.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date claimed</Text>
                    <Text style={styles.detailValue}>: {item.claimedDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date approved</Text>
                    <Text style={styles.detailValue}>: {item.approvedDate}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/Group.png')} style={styles.navIcon} /><Text>Loyalty</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/social.png')} style={styles.navIcon} /><Text>Social</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/product.png')} style={styles.navIcon} /><Text>Products</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/activity.png')} style={styles.navIcon} /><Text>My Activities</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/more.png')} style={styles.navIcon} /><Text>More</Text></TouchableOpacity>
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
  historyContainer: {},
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItemWrapper: {
    backgroundColor: '#f8fff8',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStatus: {
    color: '#666',
  },
  approved: {
    color: '#4CAF50',
  },
  waiting: {
    color: '#FFC107',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  expandedDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 120,
    color: '#666',
  },
  detailValue: {
    flex: 1,
    color: '#000',
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

export default RewardHistoryScreen;
