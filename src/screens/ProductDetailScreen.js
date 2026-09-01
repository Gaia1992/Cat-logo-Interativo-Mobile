import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProductDetailScreen({ product, onBack, onAddToCart }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        
        {product.discountPercentage > 0 && (
          <Text style={styles.discount}>Desconto de {product.discountPercentage}%</Text>
        )}

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(product)}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho 🛒</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { padding: 15 },
  backText: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
  image: { width: '100%', height: 300, resizeMode: 'contain', backgroundColor: '#f9f9f9' },
  detailsContainer: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 10 },
  discount: { fontSize: 14, color: '#ff3b30', marginBottom: 15, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', marginTop: 15, marginBottom: 5 },
  description: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 20 },
  addButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
