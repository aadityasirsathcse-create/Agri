import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OrderFilterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderFilter'
>;

type Props = {
  navigation: OrderFilterScreenNavigationProp;
};

const OrderFilterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters Orders</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Order Price Range</Text>
        <View style={styles.rangeContainer}>
          <TextInput placeholder="Minimum" style={styles.input} />
          <TextInput placeholder="Maximum" style={styles.input} />
        </View>
        <Text style={styles.label}>No. of order items</Text>
        <View style={styles.rangeContainer}>
          <TextInput placeholder="Minimum" style={styles.input} />
          <TextInput placeholder="Maximum" style={styles.input} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Reset to Default</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.solidButton}>
          <Text style={styles.solidButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FEF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  outlineButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
  },
  outlineButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  solidButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 10,
  },
  solidButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderFilterScreen;
