import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type CFSalesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CFSales'
>;

type Props = {
  navigation: CFSalesScreenNavigationProp;
};

const recentSearches = [
    { id: '1', number: 'IE0039DN30', status: 'Completed' },
    { id: '2', number: 'IE0039DN30', status: 'In progress' },
    { id: '3', number: 'IE0039DN30', status: 'Completed' },
  ];

const CFSalesScreen: React.FC<Props> = ({ navigation }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/user.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Harish Ramu</Text>
              <Text style={styles.profileRole}>C&F</Text>
            </View>
          </View>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Enter an SAP code or invoice number to get started with reporting</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter SAP code or invoice number"
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('CFOrderDetail')}
          >
            <Text style={styles.buttonText}>Report Sales</Text>
          </TouchableOpacity>

          <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
          {recentSearches.map(item => (
            <View key={item.id} style={styles.recentSearchItem}>
              <View>
                <Text style={[styles.status, item.status === 'Completed' ? styles.completed : styles.inProgress]}>
                  {item.status}
                </Text>
                <Text style={styles.invoiceNumber}>{item.number}</Text>
              </View>
              <Icon name="arrow-right" size={24} color="#4CAF50" />
            </View>
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
        marginBottom: 20,
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
});

export default CFSalesScreen;
