# Sistema de Cadastro de Carros no Estacionamento

Este projeto é um sistema simples de cadastro de carros em um estacionamento, desenvolvido com Node.js, Express, MySQL, HTML, CSS e JavaScript. A aplicação permite a criação, leitura, atualização e exclusão de registros de carros estacionados.

## Objetivo

O objetivo deste projeto é fornecer uma interface para gerenciar o cadastro de carros no estacionamento, permitindo adicionar, listar, editar e excluir registros de veículos.

## Tecnologias Utilizadas

- **Back-end**: Node.js, Express.js, MySQL
- **Banco de Dados**: MySQL
- **Front-end**: HTML, CSS, JavaScript
- **APIs**: RESTful APIs para interagir com o banco de dados (CRUD)
- **Ferramentas de Desenvolvimento**: Postman ou Thunder Client (para testes da API)

## Funcionalidades

### Funcionalidades Principais (Requisitos Funcionais)

1. **Cadastro de Carro**: O usuário pode cadastrar um novo carro, inserindo as informações necessárias como placa, modelo, cor, e data de entrada.
   
2. **Listagem de Carros**: Exibe todos os carros cadastrados no estacionamento, com informações como placa, modelo e status (se está estacionado ou não).
   
3. **Edição de Cadastro**: O usuário pode editar as informações de um carro, como o modelo e a cor.
   
4. **Exclusão de Cadastro**: O usuário pode excluir o cadastro de um carro do estacionamento.

### Funcionalidades de Teste

- A aplicação foi testada utilizando o **Thunder Client** para garantir o correto funcionamento das rotas CRUD (POST, GET, PUT, DELETE).
- O front-end consome a API utilizando `axios.()` para exibir, adicionar, editar e excluir registros.

## Requisitos Não Funcionais

1. **Segurança**: A aplicação não implementa autenticação ou autorização. Qualquer usuário pode acessar as funcionalidades de CRUD.
   
2. **Performance**: A aplicação é simples e não possui grandes demandas de performance.
   
3. **Responsividade**: O design foi feito para ser responsivo, garantindo que a interface seja funcional em dispositivos móveis e desktop.

4. **Escalabilidade**: O projeto foi desenvolvido com escalabilidade em mente, podendo ser expandido facilmente para incluir mais funcionalidades no futuro.
