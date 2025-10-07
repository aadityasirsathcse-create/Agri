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

type AddActivityScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddActivity'
>;

type Props = {
  navigation: AddActivityScreenNavigationProp;
};

const activityFor = ['Farmer', 'Retailer', 'Distributor', 'Campaign'];
const visitPurposes = ['Farmer Contact', 'Product Demonstration'];

const AddActivityScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedActivity, setSelectedActivity] = useState('Farmer');
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  const [searchedFarmer, setSearchedFarmer] = useState<string | null>(null);
  const [searchedProduct, setSearchedProduct] = useState<string | null>(null);

  const handleSearchFarmer = () => {
    setSearchedFarmer('Karthik Naren');
  };

  const handleSearchProduct = () => {
    setSearchedProduct('Probor');
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Activity</Text>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Activity for?</Text>
          <View style={styles.activityTypeContainer}>
            {activityFor.map(activity => (
              <TouchableOpacity
                key={activity}
                style={[
                  styles.activityTypeButton,
                  selectedActivity === activity && styles.selectedActivityType,
                ]}
                onPress={() => setSelectedActivity(activity)}
              >
                <Text>{activity}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purpose of visit</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowPurposeDropdown(!showPurposeDropdown)}
            >
              <Text style={styles.pickerInput}>
                {selectedPurpose || 'Select your purpose of visit'}
              </Text>
              <Icon name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
            {showPurposeDropdown && (
              <View style={styles.dropdown}>
                {visitPurposes.map(purpose => (
                  <TouchableOpacity
                    key={purpose}
                    onPress={() => {
                      setSelectedPurpose(purpose);
                      setShowPurposeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{purpose}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {selectedPurpose === 'Farmer Contact' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select farmer</Text>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name..."
                />
                <TouchableOpacity onPress={handleSearchFarmer}>
                  <Icon name="magnify" size={24} color="gray" />
                </TouchableOpacity>
              </View>
              {searchedFarmer && (
                <View style={styles.retailerCard}>
                  <View style={styles.retailerInfo}>
                    <Icon name="account-circle" size={40} color="#000" />
                    <View>
                      <Text style={styles.retailerName}>{searchedFarmer}</Text>
                      <Text style={styles.retailerLocation}>
                        Hinjewadi phase 2, Pune, Maharashtra - 407011
                      </Text>
                    </View>
                  </View>
                  <View style={styles.retailerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Icon name="map-marker-outline" size={24} color="#4CAF50" />
                      <Text style={styles.actionText}>Locate on Maps</Text>
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
          )}
          
          {selectedPurpose === 'Product Demonstration' && (
            <View>
                <View style={styles.inputGroup}>
              <Text style={styles.label}>Select farmer</Text>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name..."
                />
                <TouchableOpacity onPress={handleSearchFarmer}>
                  <Icon name="magnify" size={24} color="gray" />
                </TouchableOpacity>
              </View>
              {searchedFarmer && (
                <View style={styles.retailerCard}>
                  <View style={styles.retailerInfo}>
                    <Icon name="account-circle" size={40} color="#000" />
                    <View>
                      <Text style={styles.retailerName}>{searchedFarmer}</Text>
                      <Text style={styles.retailerLocation}>
                        Hinjewadi phase 2, Pune, Maharashtra - 407011
                      </Text>
                    </View>
                  </View>
                  <View style={styles.retailerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Icon name="map-marker-outline" size={24} color="#4CAF50" />
                      <Text style={styles.actionText}>Locate on Maps</Text>
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
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Select Product</Text>
                <View style={styles.searchInputContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search by product name..."
                  />
                  <TouchableOpacity onPress={handleSearchProduct}>
                    <Icon name="magnify" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                {searchedProduct && (
                  <View style={styles.productItem}>
                  <Image source={require('../assets/p1.png')} style={styles.productImage} />
                  <View style={styles.productNameContainer}>
                  <Text style={styles.productName}>PROBOR (500g)</Text>
                  <Text style={styles.productDescription}>Rapid dispersion and high solubility. Highly compatible with other agrochemical formul...</Text>
                  <TouchableOpacity style={styles.viewProductButton}>
                      <Text style={styles.viewProductButtonText}>View Product</Text>
                  </TouchableOpacity>
                  </View>
                </View>
                )}
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of visit</Text>
            <View style={styles.dateInputContainer}>
              <TextInput style={styles.dateInput} placeholder="DD/MM/YYYY" />
              <Icon name="calendar" size={24} color="gray" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location of the activity</Text>
            <View style={styles.mapContainer}>
              <Image source={require('../assets/map.png')} style={styles.mapImage} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Activity</Text>
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
  label: {
    marginBottom: 5,
    color: 'gray',
  },
  activityTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  activityTypeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    width: '23%',
    alignItems: 'center',
  },
  selectedActivityType: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  inputGroup: {
    marginBottom: 15,
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
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdownItem: {
    padding: 10,
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
    color: 'black',
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
  mapContainer: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  mapImage: {
      width: '100%',
      height: '100%',
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
  productNameContainer: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  productDescription:{
    fontSize: 12,
    color: 'gray',
  },
  viewProductButton:{
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      alignSelf: 'flex-start',
      marginTop: 5,
  },
  viewProductButtonText:{
      color: '#fff',
  }
});

export default AddActivityScreen;
