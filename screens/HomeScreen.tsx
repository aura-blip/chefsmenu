import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../css/styles';


export type MenuItem = {
  dish: string;
  description: string;
  category: string;
  price: string;
};

export const menuItems: MenuItem[] = [];

export default function HomeScreen({ navigation }: any) {
  const [dish, setDish] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Mains');
  const [price, setPrice] = useState('');

  const handleAddToMenu = () => {
    if (!dish.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price greater than zero.');
      return;
    }

    menuItems.push({ dish: dish.trim(), description: description.trim(), category, price });
    Alert.alert('Success', 'Item added to the menu!');
    setDish('');
    setDescription('');
    setPrice('');
    navigation.navigate('Menu Summary');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Chef Menu Manager</Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} placeholder="Enter dish name" value={dish} onChangeText={setDish} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 70 }]}
        placeholder="Enter description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Food Category</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Starter" value="Starters" />
          <Picker.Item label="Main Course" value="Mains" />
          <Picker.Item label="Dessert" value="Desserts" />
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddToMenu}>
        <Text style={styles.buttonText}>Add to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6c757d', marginTop: 15 }]}
        onPress={() => navigation.navigate('Menu Summary')}
      >
        <Text style={styles.buttonText}>View Menu Summary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
