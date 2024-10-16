import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@app/constants';

interface TabsProps<T> {
  tabs: Array<{ key: T; label: string }>;
  activeTab: T;
  onTabChange: (key: T) => void;
}

const Tabs = <T extends string>({ tabs, activeTab, onTabChange }: TabsProps<T>) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary
  },
  tabText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600'
  },
  activeTabText: {
    color: Colors.primary
  }
});

export default Tabs;
