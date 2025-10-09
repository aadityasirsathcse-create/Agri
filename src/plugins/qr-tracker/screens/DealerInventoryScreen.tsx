import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type DealerInventoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DealerInventory'
>;

type Props = {
  navigation: DealerInventoryScreenNavigationProp;
};

const DealerInventoryScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Inventory');

  const reportHistory = [
    { type: 'Inventory Report', id: 'IE0039DN30' },
    { type: 'Usage Report', id: 'IE0039DN30' },
    { type: 'Inventory Report', id: 'IE0039DN30' },
  ];

  const filteredReports = reportHistory.filter(report => {
    if (activeTab === 'Inventory') {
      return report.type === 'Inventory Report';
    } else {
      return report.type === 'Usage Report';
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={require('../../../assets/user.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Harish Ramu</Text>
              <Text style={styles.profileRole}>Dealer</Text>
            </View>
          </View>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Inventory' && styles.activeTab]}
            onPress={() => setActiveTab('Inventory')}
          >
            <Text style={[styles.tabText, activeTab === 'Inventory' && styles.activeTabText]}>Inventory Report</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Usage' && styles.activeTab]}
            onPress={() => setActiveTab('Usage')}
          >
            <Text style={[styles.tabText, activeTab === 'Usage' && styles.activeTabText]}>Usage Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.historyTitle}>Report History</Text>
          {filteredReports.map((report, index) => (
            <TouchableOpacity key={index} style={styles.historyItem} onPress={() => navigation.navigate('DealerQRDetail', { showConfirm: false })}>
              <View>
                <Text style={[styles.reportType, {backgroundColor: report.type === 'Inventory Report' ? '#4CAF50' : '#FFC107'}]}>{report.type}</Text>
                <Text style={styles.reportId}>No. {report.id}</Text>
              </View>
              <Icon name="chevron-right-circle-outline" size={30} color="green"/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('DealerScan')}>
        <Text style={styles.scanButtonText}>Start Scanning</Text>
      </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    profileRole: {
        color: 'gray',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    activeTab: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50'
    },
    tabText: {
        fontWeight: 'bold',
        color: '#000'
    },
    activeTabText: {
        color: '#fff'
    },
    content: {
        padding: 20,
    },
    historyTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
    },
    historyItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    reportType: {
        color: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
        fontSize: 12,
        marginBottom: 5,
    },
    reportId: {
        color: 'gray',
    },
    scanButton: {
        backgroundColor: '#4CAF50',
        margin: 20,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    scanButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DealerInventoryScreen;
