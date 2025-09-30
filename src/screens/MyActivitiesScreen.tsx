import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type MyActivitiesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyActivities'
>;

type Props = {
  navigation: MyActivitiesScreenNavigationProp;
};

const MyActivitiesScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems = [
    { title: 'Manage Farmers', image: require('../assets/farmerm.png'), screen: 'ManageFarmers' },
    { title: 'Manage Retailers', image: require('../assets/relator.png'), screen: 'ManageRetailers' },
    { title: 'Update Distributor', image: require('../assets/distributor.png'), screen: 'UpdateDistributor' },
    { title: 'My Activities', image: require('../assets/mactivity.png') },
    { title: 'My Complaints', image: require('../assets/complain.png') },
    { title: 'My Expenses', image: require('../assets/expences.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/user.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Harish Ramu</Text>
              <Text style={styles.profileRole}>Sales & Marketing</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Icon name="magnify" size={24} />
            <Icon name="bell-outline" size={24} />
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => item.screen && navigation.navigate(item.screen as any)}
            >
              <Image source={item.image} style={styles.menuItemImage} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingVertical: 40,
    paddingHorizontal: 15,
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
  },
  profileRole: {
    color: 'gray',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  menuItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 10
  },
  menuItemImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  menuItemText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyActivitiesScreen;
