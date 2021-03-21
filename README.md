# Sistema de Controle Online de Ar Condicionados (scoar-app)

## Sobre o sistema
A proposta do app é de controlar os aparelhos de ar condicionado do IFRN Campus Currais Novos através de uma aplicação web.
A aplicação está disponível em:  https://scoar-app.firebaseapp.com

## Recursos utilizados

- Firebase Database
- Firebase Authentication
- Firebase Hosting
- Firebase Cloud Functions
- Nuxt JS
- Arduino IDE (ESP32)

## Endpoints

### Cliente Web
O cliente foi desenvolvido em Nuxt JS utilizando o SDK fornecido pelo Firebase. Seu principal objetivo é fornecer uma interface intuitiva que permita manipular o estado dos aparelhos instalados no IFRN Campus Currais Novos.

Instruções para execução:

- Clone o repositório:

      git clone https://github.com/heitorvaldeger/scoar-app.git

- Instale as dependências do projeto:

      npm install

- Configure as variáveis do firebase de acordo com seu projeto (arquivo nuxt.config.js)
    
    ```js
    // Firebase Project
    const firebaseConfig = {
      apiKey: '',
      authDomain: '',
      databaseURL: (process.env.NODE_ENV === 'production')
        ? 'URL do Banco de Produção'
        : 'URL do Banco de Testes',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    }

    // Firebase Functions
    const firebaseFunctionsConfig = {
      location: '',
      emulatorPort: 5001,
      emulatorHost: 'http://localhost'
    }
    ```

- Executando o servidor (Desenvolvimento)

       npm run dev

Executando o firebase para ambiente de testes

      Instale o pacote firebase-tools globalmente:
      npm install -g firebase-tools