import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type TicketDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TicketDetail'
>;

type Props = {
  navigation: TicketDetailScreenNavigationProp;
};

const TicketDetailScreen: React.FC<Props> = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSend = () => {
    setMessage('No other problem. Thanks.');
    setTimeout(() => {
        setShowRatingModal(true);
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ticket Detail</Text>
          <Icon name="bell-outline" size={24} />
        </View>

        <View style={styles.ticketContainer}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketId}>Ticket No. 09484Us145</Text>
            <View style={styles.statusContainer}>
              <Icon name="check-circle" size={16} color="green" />
              <Text style={styles.ticketStatus}>
                Resolved Last updated on 12 Mar, 2024, 11:50AM
              </Text>
            </View>
          </View>

          <View style={styles.timelineContainer}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTimestamp}>You 11 Mar, 11:20AM</Text>
                <View style={styles.productDetailsContainer}>
                  <View style={styles.productItem}>
                    <Icon name="check-circle" size={20} color="green" />
                    <Image source={require('../assets/p1.png')} style={styles.productImage} />
                    <View>
                      <Text>Probor (1kg)</Text>
                      <Text>Quantity: 1</Text>
                    </View>
                  </View>
                  <View style={styles.productItem}>
                    <Icon name="check-circle" size={20} color="green" />
                    <Image source={require('../assets/p2.png')} style={styles.productImage} />
                    <View>
                      <Text>Emerald Z+ (50ml)</Text>
                      <Text>Quantity: 1</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.viewOrderLink}>View Order</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.attachmentsTitle}>Attachments</Text>
                <Image source={require('../assets/p1.png')} style={styles.attachmentImage} />
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTimestamp}>Support Team 11 Mar, 11:42AM</Text>
                <View style={styles.supportMessage}>
                  <Text>Hi [[name]], we regret that you’ve received your order with spilling issues. We will dispatch new order containing your replaced products.</Text>
                </View>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTimestamp}>You 11 Mar, 12:10PM</Text>
                {message ? (
                  <View style={styles.userMessage}>
                    <Text>{message}</Text>
                  </View>
                ) : (
                  <View style={styles.messageInputContainer}>
                    <TextInput style={styles.messageInput} placeholder="Your message..." />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                      <Icon name="send" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.endOfThread}>
                <Text>End of thread. Support Team closed this issue.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showRatingModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you satisfied?</Text>
            <Text style={styles.modalSubtitle}>
              Please rate your experience with our support team.
            </Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Icon name={star <= rating ? 'star' : 'star-outline'} size={32} color="#FFC107" />
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <View>
                <Text style={styles.modalTitle}>Tell us how can we do this better?</Text>
                <TextInput style={styles.feedbackInput} multiline />
              </View>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowRatingModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={() => setShowRatingModal(false)}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
  ticketContainer: {
    padding: 16,
  },
  ticketHeader: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  ticketId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ticketStatus: {
    marginLeft: 5,
    color: 'gray',
  },
  timelineContainer: {
    paddingLeft: 10,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
    paddingLeft: 20
  },
  timelineTimestamp: {
    color: 'gray',
    marginBottom: 10,
  },
  productDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  viewOrderLink: {
    color: '#4CAF50',
    textAlign: 'right',
  },
  attachmentsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  attachmentImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  supportMessage: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
  messageInput: {
    flex: 1,
  },
  sendButton: {
    padding: 5,
  },
  endOfThread: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 20
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#4CAF50',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
  },
});

export default TicketDetailScreen;
