import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AcknowledgementScreenRouteProp = RouteProp<RootStackParamList, 'Acknowledgement'>;

type AcknowledgementScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Acknowledgement'
>;

type Props = {
  route: AcknowledgementScreenRouteProp;
  navigation: AcknowledgementScreenNavigationProp;
};

const AcknowledgementScreen: React.FC<Props> = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [acknowledgement, setAcknowledgement] = useState('');

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{flex: 1}}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order - {orderId}</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <Icon name="magnify" size={24} />
                    <Icon name="bell-outline" size={24} />
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Write about your order</Text>
                <TextInput
                style={styles.input}
                placeholder="Your acknowledgement of your order..."
                multiline
                value={acknowledgement}
                onChangeText={setAcknowledgement}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('AcknowledgementSuccess')}
                >
                <Text style={styles.buttonText}>Submit Acknowledgement</Text>
                </TouchableOpacity>
            </View>
      </KeyboardAvoidingView>
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    textAlignVertical: 'top',
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  footer: {
    padding: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AcknowledgementScreen;
