import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function CartScreen({ cart, onToggleSelect, onRemoveItem, onBack, onProceedToCheckout }) {
  const selectedItems = cart.filter((item) => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <View style={{ width: 40 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <TouchableOpacity onPress={() => onToggleSelect(item.id)} style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, item.selected && styles.checkedBox]}>
                    {item.selected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>

                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
                </View>

                <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>Total Selecionado: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity
              style={[styles.checkoutButton, selectedItems.length === 0 && styles.disabledButton]}
              disabled={selectedItems.length === 0}
              onPress={onProceedToCheckout}
            >
              <Text style={styles.checkoutButtonText}>Avançar para Entrega ➔</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  backText: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888' },
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 8, padding: 10, borderRadius: 8, alignItems: 'center', elevation: 2 },
  checkboxContainer: { marginRight: 10 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#007AFF', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkedBox: { backgroundColor: '#007AFF' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  image: { width: 60, height: 60, borderRadius: 6, resizeMode: 'cover' },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: '#007AFF', marginTop: 4, fontWeight: '600' },
  removeButton: { padding: 8 },
  removeText: { fontSize: 16 },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  checkoutButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
