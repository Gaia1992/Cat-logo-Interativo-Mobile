import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function CheckoutPaymentScreen({ cart, deliveryData, onBack, onFinishOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const selectedItems = cart.filter((item) => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleFinish = () => {
    Alert.alert('Sucesso!', 'Pedido realizado com sucesso!', [
      { text: 'OK', onPress: onFinishOrder }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Forma de Pagamento</Text>
      <Text style={styles.subtitle}>Escolha como deseja pagar o valor de R$ {total.toFixed(2)}</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionCard, paymentMethod === 'credit' && styles.selectedOption]}
          onPress={() => setPaymentMethod('credit')}
        >
          <Text style={[styles.optionText, paymentMethod === 'credit' && styles.selectedOptionText]}>💳 Cartão de Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, paymentMethod === 'debit' && styles.selectedOption]}
          onPress={() => setPaymentMethod('debit')}
        >
          <Text style={[styles.optionText, paymentMethod === 'debit' && styles.selectedOptionText]}>💳 Cartão de Débito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, paymentMethod === 'pix' && styles.selectedOption]}
          onPress={() => setPaymentMethod('pix')}
        >
          <Text style={[styles.optionText, paymentMethod === 'pix' && styles.selectedOptionText]}>📱 Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, paymentMethod === 'boleto' && styles.selectedOption]}
          onPress={() => setPaymentMethod('boleto')}
        >
          <Text style={[styles.optionText, paymentMethod === 'boleto' && styles.selectedOptionText]}>📄 Boleto Bancário</Text>
        </TouchableOpacity>
      </View>

      <div style={{ marginTop: 20 }}>
        <Text style={styles.summaryTitle}>Resumo da Entrega:</Text>
        <Text style={styles.summaryText}>CPF: {deliveryData.cpf}</Text>
        <Text style={styles.summaryText}>Endereço: {deliveryData.address}, {deliveryData.number} (CEP: {deliveryData.cep})</Text>
      </div>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finalizar Pedido 🎉</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  subtitle: { fontSize: 15, marginBottom: 25, color: '#666' },
  optionsContainer: { marginBottom: 20 },
  optionCard: { backgroundColor: '#fff', padding: 18, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  selectedOption: { borderColor: '#007AFF', backgroundColor: '#eef6ff' },
  optionText: { fontSize: 16, color: '#333', fontWeight: '500' },
  selectedOptionText: { color: '#007AFF', fontWeight: 'bold' },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  summaryText: { fontSize: 14, color: '#666', marginBottom: 3 },
  finishButton: { backgroundColor: '#28a745', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
