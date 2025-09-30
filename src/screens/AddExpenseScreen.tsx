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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

type AddExpenseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddExpense'
>;

type Props = {
  navigation: AddExpenseScreenNavigationProp;
};

const expenseTypes = ['TA-DA', 'Promotional'];

const AddExpenseScreen: React.FC<Props> = ({ navigation }) => {
  const [showExpenseTypeDropdown, setShowExpenseTypeDropdown] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Asset[]>([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImageUpload = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
        return;
    }

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 10, quality: 1 }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setUploadedImages(prevImages => [...prevImages, ...response.assets!]);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Expense</Text>
          <Icon name="bell-outline" size={24} />
        </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expense Type</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowExpenseTypeDropdown(!showExpenseTypeDropdown)}
            >
              <Text style={styles.pickerInput}>
                {selectedExpenseType || 'Select the type of expense...'}
              </Text>
              <Icon name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
            {showExpenseTypeDropdown && (
              <View style={styles.dropdown}>
                {expenseTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => {
                      setSelectedExpenseType(type);
                      setShowExpenseTypeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {selectedExpenseType === 'Promotional' && (
              <View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Activity Date</Text>
                    <TouchableOpacity style={styles.dateInputContainer} onPress={() => setOpen(true)}>
                        <Text style={styles.dateInput}>{date.toLocaleDateString()}</Text>
                        <Icon name="calendar" size={24} color="gray" />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode="date"
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Place of the activity</Text>
                    <View style={styles.mapContainer}>
                    <Image source={require('../assets/map.png')} style={styles.mapImage} />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Expense Head</Text>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                        style={styles.searchInput}
                        placeholder="Promotional Visit"
                        />
                        <Icon name="magnify" size={24} color="gray" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Total Amount</Text>
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <TextInput style={styles.amountInput} keyboardType="numeric" />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Upload Images/Videos</Text>
                    {uploadedImages.length > 0 ? (
                        <View style={styles.imagePreviewContainer}>
                            {uploadedImages.map((img, i) => (
                                <View key={i} style={styles.imageWrapper}>
                                    <Image source={{ uri: img.uri }} style={styles.previewImage} />
                                    <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(i)}>
                                        <Icon name="close-circle" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.uploadContainer} onPress={handleImageUpload}>
                            <Icon name="plus" size={24} color="gray" />
                            <Text>Click here in the box to choose photos</Text>
                            <Text style={styles.uploadHint}>Max. 10 Bills</Text>
                        </TouchableOpacity>
                    )}
                </View>
              </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Expense</Text>
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: 'gray',
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
  footer: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  amountInputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  currencySymbol:{
      fontSize: 16,
  },
  amountInput:{
      flex: 1,
      paddingVertical: 10,
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
  uploadHint:{
      fontSize: 12,
      color: 'gray',
      marginTop: 5,
  },
  imagePreviewContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
  },
  imageWrapper:{
      position: 'relative',
  },
  previewImage:{
      width: 100,
      height: 100,
      borderRadius: 5,
  },
  removeImageButton:{
      position: 'absolute',
      top: -5,
      right: -5,
  }
});

export default AddExpenseScreen;
