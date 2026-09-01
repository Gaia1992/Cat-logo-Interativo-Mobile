cat << 'EOF' > README.md
# Catálogo Interativo Mobile

Aplicativo móvel desenvolvido em **React Native** com **Expo**, criado como parte de um projeto acadêmico. O aplicativo consome dados de uma API externa para exibir um catálogo de produtos dividido por categorias, contando com telas de autenticação e detalhes de produtos.

## 🚀 Funcionalidades
- **Tela de Login:** Autenticação básica com validação de campos.
- **Catálogo por Categorias:** Abas separadas para produtos masculinos e femininos.
- **Consumo de API:** Integração com a API pública [DummyJSON](https://dummyjson.com/) utilizando o Axios.
- **Detalhes do Produto:** Visualização detalhada de preço, desconto e descrição do item selecionado.

## 📂 Estrutura do Projeto
```text
/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # Tela de Login
│   │   ├── ProductsScreen.js       # Tela de Listagem e Categorias
│   │   └── ProductDetailScreen.js  # Tela de Detalhes do Produto
│   └── services/
│       └── api.js                  # Configuração do Axios
├── App.js                          # Componente raiz de roteamento
└── package.json