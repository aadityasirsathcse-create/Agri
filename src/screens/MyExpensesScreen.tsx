import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type MyExpensesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyExpenses'
>;

type Props = {
  navigation: MyExpensesScreenNavigationProp;
};

const expenses = [
  {
    amount: '₹3,400',
    description: 'Promotional expenses during 10/04/24',
    status: 'Approval Pending',
    date: 'Submitted on 12 Mar, 2024',
    details: {
      type: 'Promotional',
      date: '10 Apr, 24',
      head: 'Promotional visit',
      totalAmount: '₹3,400',
      location: 'Akshay minde farm',
      created: '13 Apr, 24',
      images: [require('../assets/p1.png'), require('../assets/p2.png'), require('../assets/p1.png')],
      approvalStatus: 'Rejected',
      approvalDate: '15 Apr, 24',
      rejectionReason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  },
  {
    amount: '₹300',
    description: 'TA-DA expense on 04/04/24 to 28/04/24',
    status: 'Approved',
    date: 'Approved on 12 Mar, 2024',
  },
  {
    amount: '₹1,200',
    description: 'TA-DA expense on 10/03/24 to 20/03/24',
    status: 'Rejected',
    date: 'Rejected on 12 Mar, 2024',
  },
];

const MyExpensesScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const openModal = (expense: any) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expenses</Text>
        <View style={styles.headerIcons}>
          <Icon name="magnify" size={24} />
          <Icon name="bell-outline" size={24} />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.dateFilterButton}>
          <Text>2024</Text>
          <Icon name="chevron-down" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateFilterButton}>
          <Text>April</Text>
          <Icon name="chevron-down" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addExpenseButton} onPress={() => navigation.navigate('AddExpense')}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addExpenseButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.expensesContainer}>
        {expenses.map((expense, index) => (
          <TouchableOpacity key={index} style={styles.expenseCard} onPress={() => openModal(expense)}>
            <Text style={styles.expenseAmount}>{expense.amount}</Text>
            <Text style={styles.expenseDescription}>{expense.description}</Text>
            <View style={styles.statusContainer}>
              <Icon
                name={
                  expense.status === 'Approval Pending'
                    ? 'clock-outline'
                    : expense.status === 'Approved'
                    ? 'check-circle-outline'
                    : 'close-circle-outline'
                }
                size={16}
                color={
                  expense.status === 'Approval Pending'
                    ? 'orange'
                    : expense.status === 'Approved'
                    ? 'green'
                    : 'red'
                }
              />
              <Text style={styles.statusText}>{expense.status}</Text>
            </View>
            <Text style={styles.expenseDate}>{expense.date}</Text>
            <TouchableOpacity style={styles.downloadButton}>
                <Icon name="download-circle-outline" size={24} color="green" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedExpense && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Expense Details</Text>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Expense Type</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.type}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.date}</Text>
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Expense Head</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.head}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Total Amount</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.totalAmount}</Text>
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Activity location</Text>
                        <Text style={styles.locationText}>{selectedExpense.details?.location} <Icon name="open-in-new" size={16} /></Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Created at</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.created}</Text>
                    </View>
                </View>

                <Text style={styles.detailLabel}>Upload Images/Videos</Text>
                <View style={styles.imageContainer}>
                    {selectedExpense.details?.images.map((img: any, i: number) => (
                        <Image key={i} source={img} style={styles.billImage} />
                    ))}
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Approval Status</Text>
                        <Text style={styles.rejectedStatus}>{selectedExpense.details?.approvalStatus}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Approval Status Updated at</Text>
                        <Text style={styles.detailValue}>{selectedExpense.details?.approvalDate}</Text>
                    </View>
                </View>
                <Text style={styles.detailLabel}>Reason for rejection</Text>
                <Text style={styles.rejectionReason}>{selectedExpense.details?.rejectionReason}</Text>

                <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addExpenseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addExpenseButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  expensesContainer: {
    padding: 16,
  },
  expenseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  expenseAmount: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  expenseDescription: {
    color: 'gray',
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusText: {
    marginLeft: 5,
  },
  expenseDate: {
    color: 'gray',
    fontSize: 12,
  },
  downloadButton: {
      position: 'absolute',
      right: 15,
      bottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle:{
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  detailRow:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 15,
  },
  detailItem:{
      flex: 1,
  },
  detailLabel:{
      color: 'gray',
      marginBottom: 5,
  },
  detailValue: {
    fontWeight: 'bold',
  },
  locationText:{
      color: '#4CAF50',
      fontWeight: 'bold',
  },
  imageContainer:{
      flexDirection: 'row',
      gap: 10,
      marginVertical: 10,
  },
  billImage:{
      width: 80,
      height: 100,
      borderRadius: 5,
  },
  rejectedStatus:{
      color: 'red',
      fontWeight: 'bold',
  },
  rejectionReason: {
    marginTop: 5,
  },
  closeModalButton: {
    marginTop: 20,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  closeModalButtonText: {
      color: '#4CAF50',
      fontWeight: 'bold',
  }
});

export default MyExpensesScreen;
