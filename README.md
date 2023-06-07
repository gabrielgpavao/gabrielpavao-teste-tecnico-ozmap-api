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

### 1.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Em seguida, dentro do arquivo `.env`, atribua um número para a variável `APP_PORT`, que, por sua vez, servirá para indicar em qual porta o seu servidor será iniciado.
Caso deseje rodar os testes da aplicação, atribua o valor `"teste"` à variável `NODE_ENV`

---

### 1.3. Inicialização do Servidor

Inicie o servidor localmente com o comando:

Caso use npm
```bash
npm run dev
```

Caso use yarn
```bash
yarn dev
```

## 2. Documentação da API

A documentação da API foi feita com o Swagger e está localizada na rota `/swagger` da url base.

Exemplo:
```
http://localhost:3001/swagger
```
