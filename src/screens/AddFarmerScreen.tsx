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

type AddFarmerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddFarmer'
>;

type Props = {
  navigation: AddFarmerScreenNavigationProp;
};

const AddFarmerScreen: React.FC<Props> = ({ navigation }) => {
  const [whatsappSameAsMobile, setWhatsappSameAsMobile] = useState(false);
  const [searchedRetailer, setSearchedRetailer] = useState<string | null>(null);

  const handleSearchRetailer = () => {
    // In a real app, you would perform a search
    setSearchedRetailer('Karthik Naren');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Farmer</Text>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.profileIconContainer}>
            <Icon name="account-circle" size={80} color="#000" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Your full name..." />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Your current living address..."
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder=""
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setWhatsappSameAsMobile(!whatsappSameAsMobile)}
          >
            <Icon
              name={
                whatsappSameAsMobile
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.checkboxLabel}>
              Whatsapp number is same as above
            </Text>
          </TouchableOpacity>

          {!whatsappSameAsMobile && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Whatsapp Mobile Number</Text>
              <TextInput style={styles.input} keyboardType="phone-pad" />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date Of Birth</Text>
            <View style={styles.dateInputContainer}>
              <TextInput style={styles.dateInput} placeholder="DD/MM/YYYY" />
              <Icon name="calendar" size={24} color="gray" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Retailer Details</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name..."
              />
              <TouchableOpacity onPress={handleSearchRetailer}>
                <Icon name="magnify" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          {searchedRetailer && (
            <View style={styles.retailerCard}>
              <View style={styles.retailerInfo}>
                <Icon name="account-circle" size={40} color="#000" />
                <View>
                  <Text style={styles.retailerName}>{searchedRetailer}</Text>
                  <Text style={styles.retailerLocation}>
                    Hinjewadi phase 2, Pune, Maharashtra - 407011
                  </Text>
                </View>
              </View>
              <View style={styles.retailerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="map-marker-outline" size={24} color="#4CAF50" />
                  <Text style={styles.actionText}>Locate Store</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="phone-outline" size={24} color="#4CAF50" />
                  <Text style={styles.actionText}>Call Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Profile</Text>
                  <Icon name="chevron-right" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Account</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
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
  retailerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  retailerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retailerName: {
    fontWeight: 'bold',
  },
  retailerLocation: {
    color: 'gray',
    fontSize: 12,
  },
  retailerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#4CAF50',
    marginLeft: 5,
  },
  footer: {
    padding: 16,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddFarmerScreen;
