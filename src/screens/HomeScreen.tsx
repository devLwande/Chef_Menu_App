import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';
import MenuItemCard from '../components/MenuItemCard';

export default function HomeScreen({ navigation }: any) {
  const { menuItems } = useContext(MenuContext);
  const totalItems = menuItems.length;

  const averagePrice = (course: string) => {
    const filtered = menuItems.filter(item => item.course === course);
    if (filtered.length === 0) return 0;
    return (filtered.reduce((sum, item) => sum + item.price, 0) / filtered.length).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Menu</Text>
      <Text>Total Menu Items: {totalItems}</Text>
      <Text>Average Price (Starter): R{averagePrice('Starter')}</Text>
      <Text>Average Price (Main): R{averagePrice('Main')}</Text>
      <Text>Average Price (Dessert): R{averagePrice('Dessert')}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
      />

      <Button title="Add Menu Item" onPress={() => navigation.navigate('AddMenu')} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('Filter')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});
