import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type PointsCalculatorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PointsCalculator'
>;

type Props = {
  navigation: PointsCalculatorScreenNavigationProp;
};

interface Product {
  name: string;
  pointsText: string;
  points: number;
  quantity: number;
}

const PointsCalculatorScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([
    { name: 'Hybritz', pointsText: '1Ltr / 30 points', points: 30, quantity: 0 },
    { name: 'Pearl', pointsText: '1Ltr / 60 points', points: 60, quantity: 0 },
    { name: 'Topgun - Df', pointsText: '1Ltr / 40 points', points: 40, quantity: 0 },
    { name: 'Liquiflo', pointsText: '1Ltr / 30 points', points: 30, quantity: 0 },
    { name: 'Fertis Wg', pointsText: '1kg / 100 points', points: 100, quantity: 0 },
    { name: 'Tussle', pointsText: '1Ltr / 30 points', points: 30, quantity: 0 },
    { name: 'Hybritz', pointsText: '1Ltr / 60 points', points: 60, quantity: 0 },
    { name: 'Pearl', pointsText: '1Ltr / 40 points', points: 40, quantity: 0 },
    { name: 'Topgun - Df', pointsText: '1Ltr / 30 points', points: 30, quantity: 0 },
  ]);

  const handleQuantityChange = (index: number, amount: number) => {
    const newProducts = [...products];
    const newQuantity = newProducts[index].quantity + amount;
    if (newQuantity >= 0) {
      newProducts[index].quantity = newQuantity;
      setProducts(newProducts);
    }
  };

  const totalPoints = products.reduce(
    (sum, product) => sum + product.points * product.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty</Text>
        <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.calculatorContainer}>
            <Text style={styles.calculatorTitle}>Points Calculator</Text>
            {products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPointsText}>{product.pointsText}</Text>
                    </View>
                    <View style={styles.quantityControl}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(index, -1)}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{product.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(index, 1)}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
      </ScrollView>
       <View style={styles.totalContainer}>
        <Text style={styles.totalPointsText}>Total Points : <Text style={styles.totalPointsValue}>{totalPoints}</Text></Text>
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/Group.png')} style={styles.navIcon} /><Text>Loyalty</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/social.png')} style={styles.navIcon} /><Text>Social</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/product.png')} style={styles.navIcon} /><Text>Products</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/activity.png')} style={styles.navIcon} /><Text>My Activities</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Image source={require('../assets/more.png')} style={styles.navIcon} /><Text>More</Text></TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#e5f9e5ff',
  },
  backButton: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  calculatorContainer: {
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPointsText: {
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#4CAF50',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  totalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  totalPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  totalPointsValue: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default PointsCalculatorScreen;
