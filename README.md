## Sumário

- [Início Rápido](#1-início-rápido)
    - [Instalando Dependências](#11-instalando-dependências)
    - [Variáveis de Ambiente](#12-variáveis-de-ambiente)
    - [Migrações](#13-migrações)
    - [Inicialização do Servidor](#14-inicialização-do-servidor)
    - [Execução dos Testes](#15-execução-dos-testes)
- [Documentação da API](#2-documentação-da-api)

---

## 1. Início Rápido

### 1.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

Caso use npm
```bash
npm install
```

Caso use yarn
```bash
yarn
```
---

### 1.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Em seguida, dentro do arquivo `.env`, atribua um número para a variável `APP_PORT`, que, por sua vez, servirá para indicar em qual porta o seu servidor será iniciado.
Caso deseje rodar os testes da aplicação, atribua o valor `"teste"` à variável `NODE_ENV`

---

### 1.3 Migrações

Execute as migrações para criar as entidades da aplicação com o comando:

Caso use npm
```bash
npm run typeorm migration:run -d src/data-source.ts
```

Caso use yarn
```bash
yarn typeorm migration:run -d src/data-source.ts
```

---

### 1.4. Inicialização do Servidor

Inicie o servidor localmente com o comando:

Caso use npm
```bash
npm run dev
```

Caso use yarn
```bash
yarn dev
```

---

### 1.5 Execução dos Testes

O projeto possui cobertura de testes automatizados feitos com Mocha e Chai.
Portanto, rode os testes com o comando:

Caso use npm
```bash
npm run test
```

Caso use yarn
```bash
yarn test
```

`Obs: Certifique-se de que a variável de ambiente NODE_ENV está com o valor "test" atribuído a mesma.`

---

## 2. Documentação da API

A documentação da API foi feita com o Swagger e está localizada na rota `/swagger` da url base.

Exemplo:
```
http://localhost:3001/swagger
```
