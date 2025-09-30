import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type UpdateDistributorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UpdateDistributor'
>;

type Props = {
  navigation: UpdateDistributorScreenNavigationProp;
};

const distributorsData = [
    { id: '1', name: 'Gaurav Patel', location: 'Vyaval, Nijhar' },
    { id: '2', name: 'Arockiaraj R', location: 'Kanchipuram' },
    { id: '3', name: 'Adarsh Shukla', location: 'Bilaspur' },
    { id: '4', name: 'Gaurav Patel', location: 'Vyaval, Nijhar' },
    { id: '5', name: 'Arockiaraj R', location: 'Kanchipuram' },
    { id: '6', name: 'Adarsh Shukla', location: 'Bilaspur' },
    { id: '7', name: 'Adarsh Shukla', location: 'Bilaspur' },
    { id: '8', name: 'Gaurav Patel', location: 'Vyaval, Nijhar' },
    { id: '9', name: 'Arockiaraj R', location: 'Kanchipuram' },
  ];

const UpdateDistributorScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: { item: typeof distributorsData[0] }) => (
    <View style={styles.listItem}>
      <Icon
        name="account-circle"
        size={40}
        color="#000"
        style={{ marginRight: 10 }}
      />
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemLocation}>{item.location}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('UpdateDistributorDetail')}>
        <Icon name="pencil" size={20} color="#4CAF50" />
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Distributor</Text>
        <Icon name="bell-outline" size={24} />
      </View>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" />
        <TextInput style={styles.searchInput} placeholder="Search by name..." />
      </View>
      <FlatList
        data={distributorsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemName: {
    fontWeight: 'bold',
  },
  listItemLocation: {
    color: 'gray',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: '#4CAF50',
    marginLeft: 5,
  },
});

export default UpdateDistributorScreen;
