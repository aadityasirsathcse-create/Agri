import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OrdersHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrdersHistory'
>;

type Props = {
  navigation: OrdersHistoryScreenNavigationProp;
};

type Order = {
    id: string;
    items: { name: string; quantity: number; image: any }[];
    itemCount: number;
    price: number;
    status: string;
    lastUpdate: string;
};

const orders: Order[] = [
  {
    id: '0007288877',
    items: [
        { name: 'Probor (500g)', quantity: 1, image: require('../assets/product.png') },
        { name: 'EMERALD Z+ (50ml)', quantity: 2, image: require('../assets/product.png') },
    ],
    itemCount: 6,
    price: 5699,
    status: 'Delivered',
    lastUpdate: '12 Mar, 2023',
  },
  {
    id: '0007288878',
    items: [
        { name: 'Probor (500g)', quantity: 1, image: require('../assets/product.png') },
        { name: 'EMERALD Z+ (50ml)', quantity: 2, image: require('../assets/product.png') },
    ],
    itemCount: 3,
    price: 5699,
    status: 'Dispatched',
    lastUpdate: '11 Mar, 2023',
  },
  {
    id: '0007288877',
    items: [
        { name: 'Probor (500g)', quantity: 1, image: require('../assets/product.png') },
        { name: 'EMERALD Z+ (50ml)', quantity: 2, image: require('../assets/product.png') },
    ],
    itemCount: 6,
    price: 5699,
    status: 'Delivered',
    lastUpdate: '12 Mar, 2023',
  },
];

const OrdersHistoryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders history</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
            <Icon name="magnify" size={24} />
            <Icon name="bell-outline" size={24} />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.dropdown}>
          <Text>2024</Text>
          <Icon name="chevron-down" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text>March</Text>
          <Icon name="chevron-down" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('OrderFilter')}>
          <Icon name="filter-variant" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {orders.map((order, index) => (
          <TouchableOpacity key={index} style={styles.orderCard} onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order No. {order.id}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.orderItems}>
                    {order.items.map((item, i) => (
                        <Text key={i} style={styles.itemText}>{`${item.quantity}x ${item.name}`}</Text>
                    ))}
                </View>
                <View style={styles.orderImages}>
                    {order.items.map((item, i) => (
                        <Image key={i} source={item.image} style={styles.itemImage} />
                    ))}
                </View>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.itemText}>Items : {order.itemCount}</Text>
                <Text style={styles.itemText}>Price : ₹{order.price}</Text>
            </View>
            <View style={styles.orderStatus}>
              <Icon name={order.status === 'Delivered' ? "check-circle" : "truck-delivery"} size={16} color={order.status === 'Delivered' ? '#4CAF50' : '#FFA500'} />
              <Text style={[styles.statusText, { color: order.status === 'Delivered' ? '#4CAF50' : '#FFA500' }]}>{order.status}</Text>
              <Text style={styles.statusDate}>Last updated on {order.lastUpdate}</Text>
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
    paddingVertical: 40,
    paddingHorizontal:15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginBottom: 0,
  },
  orderHeader: {
    marginBottom: 10,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderItems: {
    flex: 1,
  },
  orderImages: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  itemText: {
    color: 'gray',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  statusText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  statusDate: {
    marginLeft: 'auto',
    color: 'gray',
  },
});

export default OrdersHistoryScreen;
