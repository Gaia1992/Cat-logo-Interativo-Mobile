import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!email || !password || (isRegistering && !name)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onLoginSuccess({ email, name: name || 'Usuário' });
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Login Social', `Autenticado com sucesso via ${provider}!`);
    onLoginSuccess({ email: `usuario_${provider.toLowerCase()}@email.com`, name: `Usuário ${provider}` });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Catálogo Interativo</Text>
      <Text style={styles.subtitle}>{isRegistering ? 'Crie a sua nova conta' : 'Faça login para continuar'}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isRegistering ? 'Cadastrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem conta? Crie uma agora'}
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ou entre com</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#db4437' }]} onPress={() => handleSocialLogin('Google')}>
        <Text style={styles.socialButtonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]} onPress={() => handleSocialLogin('Facebook')}>
        <Text style={styles.socialButtonText}>Entrar com Facebook</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#333' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 25, color: '#666' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  switchButton: { alignItems: 'center', marginBottom: 20 },
  switchText: { color: '#007AFF', fontSize: 14 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  divider: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, color: '#888', fontSize: 12 },
  socialButton: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  socialButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
