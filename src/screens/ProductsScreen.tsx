import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ProductsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>;

type Props = {
  navigation: ProductsScreenNavigationProp;
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'PROBOR (500g)',
    description: 'Rapid dispersion and high solubility. Highly compatible with other agrochemical formul...',
    price: 899,
    image: require('../assets/product.png'),
    sizes: ['500g', '1kg', '5kg'],
  },
  {
    id: 2,
    name: 'PROBOR (500g)',
    description: 'Rapid dispersion and high solubility. Highly compatible with other agrochemical formul...',
    price: 899,
    image: require('../assets/product.png'), // Assuming probor.png is the same as product.png
    sizes: ['50ml', '100ml', '250ml', '500ml'],
  },
  {
    id: 3,
    name: 'PROBOR (500g)',
    description: 'Rapid dispersion and high solubility. Highly compatible with other agrochemical formul...',
    price: 899,
    image: require('../assets/product.png'),
    sizes: ['500g', '1kg', '5kg'],
  },
];

const ProductsScreen: React.FC<Props> = ({ navigation }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const isProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/user.png')} style={styles.userImage} />
        <View>
          <Text style={styles.userName}>Harish Ramu</Text>
          <Text style={styles.userRole}>Sales & Marketing</Text>
        </View>
        <View style={styles.headerIcons}>
          <Icon name="magnify" size={24} style={styles.icon} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.orderingBehalf}>You are ordering behalf of <Text style={styles.orderingBehalfName}>Karthik Naren</Text></Text>
      <View style={styles.subHeader}>
        <Text style={styles.allProductsTitle}>All Products (1,856)</Text>
        <View style={styles.filterIcons}>
          <Icon name="filter-variant" size={24} style={styles.icon} />
          <Icon name="sort" size={24} style={styles.icon} />
        </View>
      </View>
      <ScrollView>
        {products.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => navigation.navigate('ProductDetail', { product })}>
            <View style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.sizesContainer}>
                  {product.sizes.map((size) => (
                    <TouchableOpacity key={size} style={styles.sizeButton}>
                      <Text style={styles.sizeText}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>1x ₹{product.price}</Text>
                  <TouchableOpacity
                    style={isProductInCart(product) ? styles.addedButton : styles.addButton}
                    onPress={() => addToCart(product)}
                  >
                    <Text style={isProductInCart(product) ? styles.addedButtonText : styles.addButtonText}>
                      {isProductInCart(product) ? 'Added' : 'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
       <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Loyalty')}>
            <Icon name="trophy-outline" size={24} style={styles.navIcon} />
            <Text>Loyalty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Social')}>
            <Icon name="account-group-outline" size={24} style={styles.navIcon} />
            <Text>Social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="store-outline" size={24} style={styles.navIcon} />
            <Text style={{ color: '#4CAF50' }}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="clipboard-text-outline" size={24} style={styles.navIcon} />
            <Text>My Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
            <Icon name="dots-horizontal" size={24} style={styles.navIcon} />
            <Text>More</Text>
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
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#e5f9e5ff',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 12,
    color: 'gray',
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginLeft: 16,
  },
  orderingBehalf: {
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  orderingBehalfName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  allProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterIcons: {
    flexDirection: 'row',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 4,
  },
  sizesContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  sizeButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    marginRight: 8,
  },
  sizeText: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addedButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addedButtonText: {
      color: '#4CAF50',
      fontWeight: 'bold'
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
  },
});

export default ProductsScreen;
