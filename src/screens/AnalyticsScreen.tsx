
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AnalyticsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Analytics'
>;

type Props = {
  navigation: AnalyticsScreenNavigationProp;
};

const salesData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 50 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 60 },
  { month: 'May', value: 70 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 65 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 5 },
  { month: 'Oct', value: 5 },
  { month: 'Nov', value: 5 },
  { month: 'Dec', value: 5 },
];

const summaryData = [
    {label: 'Sales', value: 100},
    {label: 'Liquidation', value: 60},
    {label: 'Inventory @ Distributor', value: 25},
    {label: 'Inventory @ Market Place', value: 15},
]

const AnalyticsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <Icon name="bell-outline" size={24} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>2025 - Sales (Month wise)</Text>
            <View style={styles.chartContainer}>
                {salesData.map((item) => (
                    <View key={item.month} style={styles.barWrapper}>
                        <View style={[styles.bar, {height: `${item.value}%`}]} />
                        <Text style={styles.barLabel}>{item.month}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.salesSummary}>
                <View style={styles.salesSummaryItem}>
                    <Image source={require('../assets/points.png')} style={styles.summaryIcon} />
                    <View>
                        <Text style={styles.summaryValue}>55,234</Text>
                        <Text style={styles.summaryLabel}>Overall Sales</Text>
                    </View>
                </View>
                <View style={styles.salesSummaryItem}>
                    <Image source={require('../assets/spend.png')} style={styles.summaryIcon} />
                    <View>
                        <Text style={styles.summaryValue}>3,825</Text>
                        <Text style={styles.summaryLabel}>This month Sales</Text>
                    </View>
                </View>
            </View>
        </View>

        {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>2025 - Summary</Text>
            {summaryData.map(item => (
                <View key={item.label} style={styles.summaryRow}>
                    <Text style={styles.summaryRowLabel}>{item.label}</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, {width: `${item.value}%`}]} />
                    </View>
                    <Text style={styles.summaryRowValue}>{item.value}</Text>
                </View>
            ))}
        </View> */}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
  },
  cardTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 15,
  },
  chartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 150,
      alignItems: 'flex-end',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 10,
  },
  barWrapper: {
    alignItems: 'center',
    width: 20,
  },
  bar: {
      width: 15,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
  },
  barLabel: {
      marginTop: 5,
      fontSize: 10,
  },
  salesSummary: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
  },
  salesSummaryItem: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  summaryIcon: {
      width: 40,
      height: 40,
      marginRight: 10,
      resizeMode: 'contain'
  },
  summaryValue: {
      fontWeight: 'bold',
      fontSize: 16,
  },
  summaryLabel: {
      color: 'gray',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryRowLabel: {
      flex: 1,
      color: 'gray',
  },
  progressBarContainer: {
      flex: 2,
      height: 10,
      backgroundColor: '#eee',
      borderRadius: 5,
      marginHorizontal: 10,
  },
  progressBar: {
      height: '100%',
      backgroundColor: '#4CAF50',
      borderRadius: 5,
  },
  summaryRowValue: {
      fontWeight: 'bold',
  }
});

export default AnalyticsScreen;
