import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function MenuItemCard({ item }: { item: any }) {
  const { removeItem } = useContext(MenuContext);

  return (
    <View style={styles.card}>
      <Text>{item.name} - R{item.price} ({item.course})</Text>
      <Button title="Remove" onPress={() => removeItem(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 }
});
