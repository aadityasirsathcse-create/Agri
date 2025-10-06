
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ReportProductHeaderProps {
  title: string;
  onBackPress: () => void;
}

const ReportProductHeader: React.FC<ReportProductHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <Icon name="bell-outline" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportProductHeader;
