import React, { useContext, useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';
import MenuItemCard from '../components/MenuItemCard';

export default function FilterScreen() {
  const { menuItems } = useContext(MenuContext);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredItems = filter ? menuItems.filter(item => item.course === filter) : menuItems;

  return (
    <View style={styles.container}>
      <Text>Filter by Course</Text>
      <Button title="All" onPress={() => setFilter(null)} />
      <Button title="Starter" onPress={() => setFilter('Starter')} />
      <Button title="Main" onPress={() => setFilter('Main')} />
      <Button title="Dessert" onPress={() => setFilter('Dessert')} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
});
