import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setIsAddedToCart(false);
  };

  const decrementQuantity = () => {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
    setIsAddedToCart(false);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      setIsAddedToCart(true);
    }
  };

  const totalAmount = product.price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Shop</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.imageCarousel}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productName}>
            {product.name} Di-sodium Octaborate Tetrahydeterate fertilizer
          </Text>
          <Text style={styles.availability}>
            Available in below quantities :
          </Text>
          <View style={styles.sizesContainer}>
            {product.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                {selectedSize === size && (
                  <Icon
                    name="cart-outline"
                    size={16}
                    color="#4CAF50"
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.orderQuantity}>Order quantity :</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decrementQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productDetailsTitle}>Product details</Text>
          <Text style={styles.productDetail}>
            · Rapid dispersion and high solubility
          </Text>
          <Text style={styles.productDetail}>
            · Highly compatible with other agrochemical formulations
          </Text>
          <Text style={styles.productDetail}>
            · Enhances flower retention and fruit setting
          </Text>
        </View>
      </ScrollView>
      {quantity > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalAmountText}>Total amount</Text>
            <Text style={styles.totalAmount}>
              ₹{totalAmount.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddToCart}
          >
            {isAddedToCart ? (
              <Icon
                name="check"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            ) : null}
            <Text style={styles.actionButtonText}>
              {isAddedToCart ? 'Proceed' : 'Add to cart'}
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: '#e5f9e5ff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageCarousel: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  productDetailsContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#F9FEF9',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  availability: {
    color: 'gray',
    marginBottom: 8,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    borderColor: '#4CAF50',
  },
  sizeText: {
    color: 'black',
  },
  selectedSizeText: {
    color: '#4CAF50',
  },
  orderQuantity: {
    color: 'gray',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#4CAF50',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  productDetailsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  productDetail: {
    color: 'gray',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  totalAmountText: {
    color: 'gray',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
