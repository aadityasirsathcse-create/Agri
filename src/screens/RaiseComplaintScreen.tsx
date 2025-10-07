import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type RaiseComplaintScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RaiseComplaint'
>;

type Props = {
  navigation: RaiseComplaintScreenNavigationProp;
};

const complaintTypes = [
  'Issue with my order delivery',
  'Received damaged items / spilling issue with my order',
  'Received incorrect items in my order',
  'Issue with reward redemption',
  'Other',
];

const orders = [
  { id: '0007288877', price: '₹5,699', date: '12 Mar, 24' },
  { id: '0007271037', price: '₹7,958', date: '08 Dec, 23' },
  { id: '0007286483', price: '₹2,500', date: '10 Oct, 23' },
  { id: '0007285378', price: '₹8,020', date: '09 Oct, 23' },
];

const products = [
  { id: '1', name: 'Probor (500g)', orderedQuantity: 1, image: require('../assets/p1.png') },
  { id: '2', name: 'Emerald Z+ (50ml)', orderedQuantity: 5, image: require('../assets/p2.png') },
  { id: '3', name: 'Probor (1kg)', orderedQuantity: 2, image: require('../assets/p2.png') },
];

const RaiseComplaintScreen: React.FC<Props> = ({ navigation }) => {
  const [showComplaintTypeDropdown, setShowComplaintTypeDropdown] = useState(false);
  const [selectedComplaintType, setSelectedComplaintType] = useState<string | null>(null);
  const [searchedOrder, setSearchedOrder] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                  >
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Raise Complaint</Text>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Complaint Type</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowComplaintTypeDropdown(!showComplaintTypeDropdown)}
            >
              <Text style={styles.pickerInput}>
                {selectedComplaintType || 'Please select your issue type'}
              </Text>
              <Icon name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
            {showComplaintTypeDropdown && (
              <View style={styles.dropdown}>
                {complaintTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => {
                      setSelectedComplaintType(type);
                      setShowComplaintTypeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {selectedComplaintType && (
            <View style={styles.inputGroup}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by price, date & order no."
                />
                <TouchableOpacity onPress={() => setSearchedOrder(true)}>
                  <Icon name="magnify" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {searchedOrder && !selectedProducts.length &&(
            <View>
              {orders.map(order => (
                <TouchableOpacity key={order.id} onPress={() => setShowProductModal(true)}>
                  <View style={styles.orderItem}>
                    <Text>Order No. {order.id}</Text>
                    <Text>{order.price}</Text>
                    <Text>{order.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedProducts.length > 0 && (
              <View style={styles.selectedProductsContainer}>
                  {selectedProducts.map(product => (
                      <View key={product.id} style={styles.selectedProductItem}>
                          <Icon name="check-circle" size={20} color="green" />
                          <Image source={product.image} style={styles.productImage} />
                          <View>
                              <Text>{product.name}</Text>
                              <Text>Quantity: {product.quantity}</Text>
                          </View>
                      </View>
                  ))}
                  <TouchableOpacity style={styles.addMoreItemsButton} onPress={() => setShowProductModal(true)}>
                      <Text style={styles.addMoreItemsText}>+ Add more items</Text>
                  </TouchableOpacity>
              </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Remarks</Text>
            <TextInput style={[styles.input, styles.remarksInput]} multiline />
          </View>


          {selectedProducts.length > 0 && (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Upload Images/Videos</Text>
                <View style={styles.uploadContainer}>
                    {!uploadedImage ? (
                        <TouchableOpacity style={styles.uploadButton} onPress={() => setUploadedImage(true)}>
                            <Icon name="plus" size={24} color="gray" />
                            <Text>Click here in the box to choose photos</Text>
                            <Text style={styles.uploadHint}>Max. 10 attachments</Text>
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../assets/p1.png')} style={styles.uploadedImage} />
                    )}
                </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.raiseButton}>
          <Text style={styles.raiseButtonText}>Raise an issue</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

      <Modal visible={showProductModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select products in this order</Text>
            <Text style={styles.modalSubtitle}>
              Please only select the products with problem
            </Text>
            {products.map(product => (
              <View key={product.id} style={styles.productSelectItem}>
                <TouchableOpacity>
                    <Icon name={selectedProducts.find(p => p.id === product.id) ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text>{product.name}</Text>
                  <Text>Ordered Quantity: {product.orderedQuantity}</Text>
                </View>
                {selectedProducts.find(p => p.id === product.id) && (
                    <TextInput style={styles.quantityInput} defaultValue={product.orderedQuantity.toString()} />
                )}
              </View>
            ))}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowProductModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setSelectedProducts([
                      { id: '3', name: 'Probor (1kg)', quantity: 1, image: require('../assets/p1.png') },
                      { id: '2', name: 'Emerald Z+ (50ml)', quantity: 2, image: require('../assets/p2.png') },
                  ]);
                  setShowProductModal(false);
                }}
              >
                <Text style={styles.confirmButtonText}>Confirm Selected</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  remarksInput: {
    height: 100,
    textAlignVertical: 'top',
    color:'black',
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
    color:'black',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footer: {
    padding: 16,
  },
  raiseButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  raiseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    color: 'gray',
    marginBottom: 15,
  },
  productSelectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  productInfo: {
    flex: 1,
  },
  quantityInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 5,
      width: 50,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    marginRight: 10,
  },
  closeButtonText: {
    color: '#4CAF50',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
  },
  confirmButtonText: {
    color: '#fff',
  },
  selectedProductsContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#eee',
  },
  selectedProductItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  addMoreItemsButton:{
      alignItems: 'center',
      marginTop: 10,
  },
  addMoreItemsText:{
      color: '#4CAF50',
  },
  uploadContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 20,
      borderStyle: 'dashed',
  },
  uploadButton:{
      alignItems: 'center',
  },
  uploadHint:{
      fontSize: 12,
      color: 'gray',
      marginTop: 5,
  },
  uploadedImage:{
      width: 100,
      height: 100,
  }
});

export default RaiseComplaintScreen;
