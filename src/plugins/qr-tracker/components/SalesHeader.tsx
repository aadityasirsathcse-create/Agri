
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SalesHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/user.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Harish Ramu</Text>
          <Text style={styles.profileRole}>C&F</Text>
        </View>
      </View>
      <Icon name="bell-outline" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SalesHeader;
