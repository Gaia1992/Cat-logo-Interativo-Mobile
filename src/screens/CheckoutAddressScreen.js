import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function CheckoutAddressScreen({ onBack, onProceedToPayment }) {
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const handleNext = () => {
    if (!cpf || !cep || !address || !number) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos de entrega (CPF e Endereço).');
      return;
    }
    onProceedToPayment({ cpf, cep, address, number });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar ao Carrinho</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Dados de Entrega</Text>
      <Text style={styles.subtitle}>Informe seu CPF e o endereço de destino</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF (000.000.000-00)"
        placeholderTextColor="#888"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="CEP (00000-000)"
        placeholderTextColor="#888"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço (Rua, Avenida...)"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Número e Complemento"
        placeholderTextColor="#888"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Ir para Pagamento ➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  subtitle: { fontSize: 15, marginBottom: 25, color: '#666' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
