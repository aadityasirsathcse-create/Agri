import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const initialCartItems = [
  {
    id: '1',
    name: 'PROBOR - 500g Di-sodium Octaborate Tetr...',
    price: 899,
    quantity: 1,
    image: require('../assets/p1.png'),
  },
  {
    id: '2',
    name: 'PROBOR - 1kg Di-sodium Octaborate Tetrah...',
    price: 1500,
    quantity: 5,
    image: require('../assets/p2.png'),
  },
];

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

type Props = {
  navigation: CartScreenNavigationProp;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      const updatedCartItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      );
      setCartItems(updatedCartItems);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 1 && cartItems[1].quantity > 4) {
      setBottomSheetVisible(true);
    } else {
      navigation.navigate('Checkout');
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price : ₹{item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalAmountText}>Total amount</Text>
          <Text style={styles.totalAmount}>
            {totalItems}x ₹{totalAmount.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => {
          setBottomSheetVisible(!isBottomSheetVisible);
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <Image
              source={require('../assets/cart.png')}
              style={styles.bottomSheetImage}
            />
            <Text style={styles.bottomSheetTitle}>Insufficient Funds</Text>
            <Text style={styles.bottomSheetMessage}>
              It seems like your wallet does not have sufficient funds to make this
              purchase. Please contact your sales executive.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:40,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalAmountText: {
    fontSize: 14,
    color: 'gray',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  bottomSheetImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bottomSheetMessage: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
