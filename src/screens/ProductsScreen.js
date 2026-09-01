import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import api from '../services/api';

export default function ProductsScreen({ onSelectProduct, onGoToCart, onLogout, cartCount }) {
  const [selectedTab, setSelectedTab] = useState('masculino');
  const [selectedCategory, setSelectedCategory] = useState('mens-shirts');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = {
    masculino: [
      { id: 'mens-shirts', name: 'Camisas' },
      { id: 'mens-shoes', name: 'Calçados' },
      { id: 'mens-watches', name: 'Relógios' },
    ],
    feminino: [
      { id: 'womens-bags', name: 'Bolsas' },
      { id: 'womens-dresses', name: 'Vestidos' },
      { id: 'womens-jewellery', name: 'Jóias' },
      { id: 'womens-shoes', name: 'Calçados' },
      { id: 'womens-watches', name: 'Relógios' },
    ],
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      const response = await api.get(`/products/category/${category}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loja Online</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onGoToCart} style={styles.cartButton}>
            <Text style={styles.cartText}>🛒 Carrinho ({cartCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainTabs}>
        <TouchableOpacity
          style={[styles.mainTabButton, selectedTab === 'masculino' && styles.activeMainTab]}
          onPress={() => {
            setSelectedTab('masculino');
            setSelectedCategory('mens-shirts');
          }}
        >
          <Text style={[styles.mainTabText, selectedTab === 'masculino' && styles.activeMainTabText]}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainTabButton, selectedTab === 'feminino' && styles.activeMainTab]}
          onPress={() => {
            setSelectedTab('feminino');
            setSelectedCategory('womens-bags');
          }}
        >
          <Text style={[styles.mainTabText, selectedTab === 'feminino' && styles.activeMainTabText]}>Feminino</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subTabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories[selectedTab].map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.subTab, selectedCategory === cat.id && styles.activeSubTab]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={[styles.subTabText, selectedCategory === cat.id && styles.activeSubTabText]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => onSelectProduct(item)}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
                {item.discountPercentage > 0 && (
                  <Text style={styles.discount}>-{item.discountPercentage}% OFF</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  cartButton: { marginRight: 10, padding: 8, backgroundColor: '#eef2f7', borderRadius: 5 },
  cartText: { color: '#007AFF', fontWeight: 'bold', fontSize: 13 },
  logoutButton: { padding: 8, backgroundColor: '#ff3b30', borderRadius: 5 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  mainTabs: { flexDirection: 'row', backgroundColor: '#fff' },
  mainTabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeMainTab: { borderBottomColor: '#007AFF' },
  mainTabText: { fontSize: 16, color: '#666' },
  activeMainTabText: { color: '#007AFF', fontWeight: 'bold' },
  subTabsContainer: { paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#fff', marginBottom: 10 },
  subTab: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#eee', borderRadius: 20, marginRight: 8 },
  activeSubTab: { backgroundColor: '#007AFF' },
  subTabText: { color: '#333' },
  activeSubTabText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 8, padding: 10, borderRadius: 8, alignItems: 'center', elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 6, resizeMode: 'cover' },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: '#007AFF', marginTop: 4, fontWeight: '600' },
  discount: { fontSize: 12, color: '#ff3b30', marginTop: 2 },
});
