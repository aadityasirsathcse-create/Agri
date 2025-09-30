import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type UpdateDistributorDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UpdateDistributorDetail'
>;

type Props = {
  navigation: UpdateDistributorDetailScreenNavigationProp;
};

const products = [
  {
    id: '1',
    name: 'PROBOR Disodium Octaborate Tetrahydertae fertilizer',
    image: require('../assets/p1.png'),
  },
  {
    id: '2',
    name: 'EMERALD Z+ (50ml)',
    image: require('../assets/p2.png'),
  },
];

const UpdateDistributorDetailScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Update Distributor</Text>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.profileIconContainer}>
            <Icon name="account-circle" size={80} color="#000" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value="Arockiaraj R" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput style={styles.input} value="7094252535" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date Of Birth</Text>
            <View style={styles.dateInputContainer}>
              <TextInput style={styles.dateInput} value="01/01/1990" />
              <Icon name="calendar" size={24} color="gray" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Turnover</Text>
            <View style={styles.pickerContainer}>
              <TextInput style={styles.pickerInput} value="3,00,000 - 5,00,000" />
              <Icon name="chevron-down" size={24} color="gray" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Top 5 Bestselling Products</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by product name..."
              />
              <TouchableOpacity>
                <Icon name="magnify" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {products.map(item => (
              <View key={item.id} style={styles.productItem}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <TouchableOpacity>
                  <Icon name="delete-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Distributor</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  profileIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dateInput: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  pickerInput: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  productName: {
    flex: 1,
  },
  footer: {
    padding: 16,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UpdateDistributorDetailScreen;
