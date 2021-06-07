# Sistema de Controle Online de Ar Condicionados (scoar-app)

## Sobre o sistema
A proposta do app é de controlar os aparelhos de ar condicionado do IFRN Campus Currais Novos através de uma aplicação web.
A aplicação está disponível em:  https://scoar-app.firebaseapp.com

## Entidades envolvidas

### Cliente Web
O cliente foi desenvolvido em Nuxt JS utilizando o SDK fornecido pelo Firebase. Seu principal objetivo é fornecer uma interface intuitiva que permita manipular o estado dos aparelhos instalados no IFRN Campus Currais Novos, bem como outros requisitos que fazem parte do escopo do projeto.

### Firebase
Foram utilizados os seguintes módulos do Firebase: 
- **Realtime Database**: para o armazenamento das informações necessárias
na execução do sistema.
- **Authentication**: módulo de autenticação do firebase, utilizando o provedor email/senha.
- **Hosting**: módulo de hospedagem para o projeto.

### Hub (Backend)
Foi construído um Hub, que permite a execução de funções no backend de manipulação de usuários e eventos em massa, por exemplo.

Devido as novas políticas adotadas pelo firebase para a execução de Cloud Functions, foi necessário o desenvolvimento desta entidade.
