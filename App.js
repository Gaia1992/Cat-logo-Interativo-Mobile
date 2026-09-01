import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutAddressScreen from './src/screens/CheckoutAddressScreen';
import CheckoutPaymentScreen from './src/screens/CheckoutPaymentScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('products'); // 'products', 'detail', 'cart', 'address', 'payment'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [deliveryData, setDeliveryData] = useState({});

  const handleAddToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex >= 0) {
      alert('Este produto já está no carrinho!');
    } else {
      setCart([...cart, { ...product, selected: true }]);
      alert('Produto adicionado ao carrinho com sucesso!');
    }
    setCurrentScreen('products');
  };

  const handleToggleSelect = (id) => {
    setCart(cart.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <LoginScreen onLoginSuccess={(userData) => setUser(userData)} />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'detail' && selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setCurrentScreen('products')}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'cart') {
    return (
      <SafeAreaView style={styles.container}>
        <CartScreen
          cart={cart}
          onToggleSelect={handleToggleSelect}
          onRemoveItem={handleRemoveItem}
          onBack={() => setCurrentScreen('products')}
          onProceedToCheckout={() => setCurrentScreen('address')}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'address') {
    return (
      <SafeAreaView style={styles.container}>
        <CheckoutAddressScreen
          onBack={() => setCurrentScreen('cart')}
          onProceedToPayment={(data) => {
            setDeliveryData(data);
            setCurrentScreen('payment');
          }}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'payment') {
    return (
      <SafeAreaView style={styles.container}>
        <CheckoutPaymentScreen
          cart={cart}
          deliveryData={deliveryData}
          onBack={() => setCurrentScreen('address')}
          onFinishOrder={() => {
            setCart([]);
            setCurrentScreen('products');
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProductsScreen
        cartCount={cart.length}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setCurrentScreen('detail');
        }}
        onGoToCart={() => setCurrentScreen('cart')}
        onLogout={() => {
          setUser(null);
          setCart([]);
          setCurrentScreen('products');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
