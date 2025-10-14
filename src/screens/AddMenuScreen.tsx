import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function AddMenuScreen({ navigation }: any) {
  const { addItem } = useContext(MenuContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');

  const handleAdd = () => {
    if (!name || !price || !course) return;
    addItem(name, parseFloat(price), course);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Add a New Menu Item</Text>
      <TextInput placeholder="Item Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Price" style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="Course (Starter/Main/Dessert)" style={styles.input} value={course} onChangeText={setCourse} />
      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }
});
