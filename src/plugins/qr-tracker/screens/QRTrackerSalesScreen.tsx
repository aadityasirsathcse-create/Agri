
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStackParamList } from '../../../../App';
import { salesScreenMessages } from '../constants/messages';
import SalesHeader from '../components/SalesHeader';
import { reportSales } from '../actions/qrTrackerThunks';
import { QRTrackerState } from '../reducers/qrTrackerReducer';

type QRTrackerSalesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFSales'
>;

type Props = {
  navigation: QRTrackerSalesScreenNavigationProp;
};

const recentSearches = [
  { id: '1', number: 'IE0039DN30', status: 'Completed' },
  { id: '2', number: 'IE0039DN33', status: 'In progress' },
  { id: '3', number: 'IE0039DN36', status: 'Completed' },
];

const QRTrackerSalesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const { salesError } = useSelector((state: { qrTracker: QRTrackerState }) => state.qrTracker);

  const handleReportSales = () => {
    dispatch(reportSales(invoiceNumber, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SalesHeader />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{salesScreenMessages.title}</Text>
          <TextInput
            style={styles.input}
            placeholder={salesScreenMessages.placeholder}
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
          />
          {salesError ? <Text style={styles.errorText}>{salesError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleReportSales}>
            <Text style={styles.buttonText}>{salesScreenMessages.buttonText}</Text>
          </TouchableOpacity>

          <Text style={styles.recentSearchesTitle}>{salesScreenMessages.recentSearchesTitle}</Text>
          {recentSearches.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('CFOrderDetail' as any)}
            >
              <View style={styles.recentSearchItem}>
                <View>
                  <Text
                    style={[
                      styles.status,
                      item.status === 'Completed'
                        ? styles.completed
                        : styles.inProgress,
                    ]}
                  >
                    {item.status}
                  </Text>
                  <Text style={styles.invoiceNumber}>{item.number}</Text>
                </View>
                <Icon name="arrow-right" size={24} color="#4CAF50" />
              </View>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  recentSearchItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  inProgress: {
    backgroundColor: '#FFC107',
  },
  invoiceNumber: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default QRTrackerSalesScreen;
