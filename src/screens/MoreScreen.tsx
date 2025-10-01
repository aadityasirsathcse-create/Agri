import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type MoreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'More'
>;

type Props = {
  navigation: MoreScreenNavigationProp;
};

const MoreScreen: React.FC<Props> = ({ navigation }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const menuItems = [
    { title: 'Scan QR', image: require('../assets/qr.png'), id: 'scan-qr' },
    { title: 'My Orders', image: require('../assets/or.png'), notification: '24/7 Service', screen: 'OrdersHistory' },
    { title: 'Analytics', image: require('../assets/an.png'), screen: 'Analytics' },
    { title: 'Quiz / Survey', image: require('../assets/an.png'), notification: '2 Newly added' },
    { title: 'Crop Advisory', image: require('../assets/cr.png'), notification: '2 New advisory issued' },
    { title: 'Disease and Pest', image: require('../assets/pest.png'), notification: 'You are up-to date' },
  ];

  const qrOptions = ['C&F Agent', 'Dealer', 'Retailer', 'Farmer'];

  const handleMenuItemPress = (item: any) => {
    if (item.id === 'scan-qr') {
      setShowQrModal(true);
    } else if (item.screen) {
      navigation.navigate(item.screen as any);
    }
  };

    const handleQrOptionPress = (option: string) => {
    setShowQrModal(false);
    if (option === 'C&F Agent') {
      navigation.navigate('CFSales');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/user.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Harish Ramu</Text>
              <Text style={styles.profileRole}>Sales & Marketing</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Icon name="bell-outline" size={24} />
          </View>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item)}
            >
                {item.notification && 
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationText}>{item.notification}</Text>
                    </View>
                }
                <Text style={styles.menuItemText}>{item.title}</Text>
                <Image source={item.image} style={styles.menuItemImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showQrModal}
        onRequestClose={() => setShowQrModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowQrModal(false)}>
                <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            {qrOptions.map((option, i) => (
                <TouchableOpacity key={i} style={styles.dropdownItem} onPress={() => handleQrOptionPress(option)}>
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
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
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuItem: {
    width: '48%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 16,
    padding: 10,
    position: 'relative',
  },
  menuItemImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menuItemText: {
    fontWeight: 'bold',
    textAlign: 'left',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#FFC107',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  notificationText: {
      fontSize: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
  },
  dropdownItem: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  dropdownItemText: {
      fontSize: 18,
  }
});

export default MoreScreen;
