import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type MyComplaintsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyComplaints'
>;

type Props = {
  navigation: MyComplaintsScreenNavigationProp;
};

const complaintTypes = ['Farmer', 'Retailer', 'Distributor'];

const tickets = [
  {
    id: '09484Us145',
    invoice: '0007288877',
    product: 'Probor (500g)',
    image: require('../assets/p1.png'),
    status: 'Open',
    lastUpdated: '12 Mar, 2024',
  },
  {
    id: '09484Us144',
    invoice: '00072692017',
    product: 'Probor (500g)',
    image: require('../assets/p2.png'),
    status: 'Resolved',
    lastUpdated: '08 Dec, 2023',
  },
  {
    id: '09484Us143',
    invoice: '000726352788',
    product: 'Probor (500g)',
    image: require('../assets/p2.png'),
    status: 'Resolved',
    lastUpdated: '10 Oct, 2023',
  },
];

const MyComplaintsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('Farmer');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <Icon name="bell-outline" size={24} />
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.complaintTypeContainer}>
          {complaintTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.complaintTypeButton,
                selectedType === type && styles.selectedComplaintType,
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text
                style={[
                  styles.complaintTypeText,
                  selectedType === type && styles.selectedComplaintTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dateFiltersContainer}>
          <TouchableOpacity style={styles.dateFilterButton}>
            <Text>2024</Text>
            <Icon name="chevron-down" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateFilterButton}>
            <Text>March</Text>
            <Icon name="chevron-down" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.raiseNewButton} onPress={() => navigation.navigate('RaiseComplaint')}>
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.raiseNewButtonText}>Raise New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.ticketsContainer}>
        {tickets.map(ticket => (
          <TouchableOpacity key={ticket.id} style={styles.ticketCard} onPress={() => navigation.navigate('TicketDetail')}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketId}>Ticket No. {ticket.id}</Text>
              <Text style={styles.ticketInvoice}>Invoice No. {ticket.invoice}</Text>
            </View>
            <View style={styles.ticketBody}>
                <View style={styles.productInfoContainer}>
                    <Image source={ticket.image} style={styles.productImage} />
                    <Text style={styles.productName}>1x {ticket.product}</Text>
                </View>
            </View>
            <View style={styles.ticketFooter}>
              <Icon
                name={ticket.status === 'Open' ? 'alert-circle-outline' : 'check-circle'}
                size={16}
                color={ticket.status === 'Open' ? 'orange' : 'green'}
              />
              <Text style={styles.ticketStatus}>
                {ticket.status} Last updated on {ticket.lastUpdated}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filtersContainer: {
    padding: 16,
  },
  complaintTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  complaintTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedComplaintType: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  complaintTypeText: {
    color: '#000',
  },
  selectedComplaintTypeText: {
    color: '#fff',
  },
  dateFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  raiseNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  raiseNewButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  ticketsContainer: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  ticketHeader: {
    marginBottom: 10,
  },
  ticketId: {
    fontWeight: 'bold',
  },
  ticketInvoice: {
    color: 'gray',
  },
  ticketBody: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  productName: {
    flex: 1,
  },
  ticketFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ticketStatus: {
    marginLeft: 5,
    color: 'gray',
  },
});

export default MyComplaintsScreen;
