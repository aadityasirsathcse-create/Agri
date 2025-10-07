import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type DealerSuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DealerSuccess'
>;

type Props = {
  navigation: DealerSuccessScreenNavigationProp;
};

const DealerSuccessScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="check-decagram" size={100} color="#4CAF50" />
        <Text style={styles.title}>Inventory report updated</Text>
        <Text style={styles.subtitle}>Inventory report successfully updated for the order number IE0039DN30.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.pop(3)}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9e5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DealerSuccessScreen;
