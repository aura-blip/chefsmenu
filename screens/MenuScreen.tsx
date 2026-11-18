import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../css/styles';
import { menuItems, MenuItem } from './HomeScreen';

export default function MenuScreen() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDish, setEditDish] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('Mains');
  const [editPrice, setEditPrice] = useState('');

  // Refresh the list whenever this screen is opened.
  useFocusEffect(
    useCallback(() => {
      setItems([...menuItems]);
    }, [])
  );

  const startEdit = (item: MenuItem, index: number) => {
    setEditIndex(index);
    setEditDish(item.dish);
    setEditDescription(item.description);
    setEditCategory(item.category);
    setEditPrice(item.price);
  };

  const saveEdit = () => {
    if (!editDish.trim() || !editDescription.trim() || !editPrice.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (isNaN(Number(editPrice)) || Number(editPrice) <= 0) {
      Alert.alert('Error', 'Please enter a valid price greater than zero.');
      return;
    }
    if (editIndex !== null) {
      menuItems[editIndex] = {
        dish: editDish.trim(),
        description: editDescription.trim(),
        category: editCategory,
        price: editPrice,
      };
      setItems([...menuItems]);
      setEditIndex(null);
      Alert.alert('Success', 'Menu item updated.');
    }
  };

  const deleteItem = (index: number) => {
    Alert.alert('Delete item', 'Are you sure you want to delete this menu item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          menuItems.splice(index, 1);
          setItems([...menuItems]);
          if (editIndex === index) setEditIndex(null);
          Alert.alert('Deleted', 'Menu item removed.');
        },
      },
    ]);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.dish.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || item.category === filter;
    return matchesSearch && matchesCategory;
  });

  const averagePrice = items.length === 0
    ? '0.00'
    : (items.reduce((total, item) => total + Number(item.price), 0) / items.length).toFixed(2);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Menu Summary</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Menu Statistics</Text>
        <Text style={styles.text}>Total menu items: {items.length}</Text>
        <Text style={styles.text}>Average price: R{averagePrice}</Text>
        <Text style={styles.text}>Starters: {items.filter((item) => item.category === 'Starters').length}</Text>
        <Text style={styles.text}>Main Courses: {items.filter((item) => item.category === 'Mains').length}</Text>
        <Text style={styles.text}>Desserts: {items.filter((item) => item.category === 'Desserts').length}</Text>
      </View>

      <Text style={styles.label}>Search by dish name</Text>
      <TextInput
        style={styles.input}
        placeholder="Search menu..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.label}>Filter by course</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={filter} onValueChange={setFilter}>
          <Picker.Item label="All Courses" value="All" />
          <Picker.Item label="Starter" value="Starters" />
          <Picker.Item label="Main Course" value="Mains" />
          <Picker.Item label="Dessert" value="Desserts" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6c757d', marginBottom: 15 }]}
        onPress={() => { setSearch(''); setFilter('All'); }}
      >
        <Text style={styles.buttonText}>Clear Search and Filter</Text>
      </TouchableOpacity>

      {editIndex !== null && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edit Menu Item</Text>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput style={styles.input} value={editDish} onChangeText={setEditDish} placeholder="Dish name" />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 70 }]}
            value={editDescription}
            onChangeText={setEditDescription}
            multiline
            placeholder="Description"
          />
          <Text style={styles.label}>Food Category</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={editCategory} onValueChange={setEditCategory}>
              <Picker.Item label="Starter" value="Starters" />
              <Picker.Item label="Main Course" value="Mains" />
              <Picker.Item label="Dessert" value="Desserts" />
            </Picker>
          </View>
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={editPrice}
            onChangeText={setEditPrice}
            keyboardType="decimal-pad"
            placeholder="Price"
          />
          <TouchableOpacity style={styles.button} onPress={saveEdit}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#6c757d', marginTop: 10 }]}
            onPress={() => setEditIndex(null)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredItems}
        scrollEnabled={false}
        keyExtractor={(item, index) => `${item.dish}-${index}`}
        renderItem={({ item }) => {
          const originalIndex = items.indexOf(item);
          return (
            <View style={styles.card}>
              <Text style={styles.categoryTag}>{item.category.toUpperCase()}</Text>
              <Text style={styles.cardTitle}>{item.dish}</Text>
              <Text style={styles.text}>Description: {item.description}</Text>
              <Text style={styles.text}>Price: R{Number(item.price).toFixed(2)}</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 6 }]}
                  onPress={() => startEdit(item, originalIndex)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, backgroundColor: '#dc3545', marginLeft: 6 }]}
                  onPress={() => deleteItem(originalIndex)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items found.</Text>}
      />
    </ScrollView>
  );
}
