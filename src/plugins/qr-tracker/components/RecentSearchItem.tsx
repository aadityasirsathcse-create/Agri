
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RecentSearchItemProps {
  item: {
    id: string;
    number: string;
    status: 'Completed' | 'In progress';
  };
  onPress: () => void;
}

const RecentSearchItem: React.FC<RecentSearchItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.recentSearchItem}>
        <View>
          <Text
            style={[
              styles.status,
              item.status === 'Completed'
                ? styles.completed
                : styles.inProgress,
            ]}
          >
            {item.status}
          </Text>
          <Text style={styles.invoiceNumber}>{item.number}</Text>
        </View>
        <Icon name="arrow-right" size={24} color="#4CAF50" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recentSearchItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  inProgress: {
    backgroundColor: '#FFC107',
  },
  invoiceNumber: {
    fontWeight: 'bold',
  },
});

export default RecentSearchItem;
