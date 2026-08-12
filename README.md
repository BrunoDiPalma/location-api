# Location API

API REST para gerenciamento de Estados e Cidades, desenvolvida como desafio técnico para vaga de estágio em Node.js.

## 1. Como executar

### Pré-Requisitos

- Node.js.
- TypeScript.
- PostgreSQL ou acesso a um banco PostgreSQL (projeto desenvolvido com Supabase).

1. Clone o repositório:

```bash
    git clone https://github.com/BrunoDiPalma/location-api
    cd location-api
```

2. Instale as dependências:

```
    npm install
```

3. Crie um arquivo `.env` na raiz do projeto, a partir do arquivo `.env.example` para configurar as variáveis de ambiente:

```env
    DIRECT_URL="postgresql://usuario:senha@host:5432/postgres"
    PORT=3000
```

4. Gere o Prisma Client:

```bash
   npx prisma generate
```

5. Aplique as migrations no banco:

```bash
   npx prisma migrate deploy
```

6. Inicie o servidor em modo desenvolvimento:

```bash
   npm run dev
```

O servidor ficará disponível em: `http://localhost:3000`.

7. Scripts disponíveis:
```bash
npm run dev      # Executa a aplicação em modo de desenvolvimento
npm run build    # Compila o projeto TypeScript
npm start        # Executa a aplicação compilada
```

## 2. Tecnologias utilizadas
### Backend
- Node.js - ambiente de execução JavaScript.
- Express - framework utilizado para construção da API REST.
- TypeScript - usado para tipagem estática.

### Banco de dados
- PostgreSQL - banco de dados relacional.
- Prisma ORM - acesso ao banco de dados, modelagem e gerenciamento de migrations.

### Validação
- Zod - definição de schemas para dados recebidos pela API.

### Ferramentas
- Git - Controle de versionamento.
- GitHub - hospedagem do código-fonte.
- Postman - utilizado para testar as requisições da API.
- Supabase - Utilizado como ambiente PostgreSQL durante o desenvolvimento do projeto.

## 3. Estrutura do projeto
```
location-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── prisma.ts
│   │
│   ├── controllers/
│   │   ├── city.controller.ts
│   │   └── state.controller.ts
│   │
│   ├── middlewares/
│   │   └── validate.middleware.ts
│   │
│   ├── routes/
│   │   ├── city.routes.ts
│   │   └── state.routes.ts
│   │
│   ├── schemas/
│   │   ├── city.schema.ts
│   │   └── state.schema.ts
│   │
│   ├── services/
│   │   ├── city.service.ts
│   │   └── state.service.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

A aplicação foi organizada de forma a separar as responsabilidades em diferentes processos:
- Routes: definição dos endpoints e aplicação dos middlewares.
- Middlewares: validação das requisições antes de chegarem aos controllers.
- Schemas: validação das regras utilizando Zod.
- Controllers: tratamento das requisições e respostas HTTP.
- Services: implementação das regras de negócio e comunicação com banco de dados através do Prisma.
- Config: configuração da instância do Prisma Cliente.
- Prisma: modelagem do banco de dados e migrations.

## 4. Decisões técnicas

### 1. Por que escolheu esse framework?
Escolhi o Express por ser um framework que abrange a estrutura solicitada pelo projeto, sem adicionar complexidade desnecessária. Como já possuo experiência prévia com a ferramenta, pude focar na implementação das regras de negócio.

### 2. Como organizou o projeto?
O projeto foi organizado em camadas, visando separar as responsabilidades da aplicação. 

As routes foram utilizadas para definir os endpoints e os middlewares utilizados em cada rota. 

Os controllers tratam o fluxo HTTP de requisição e resposta.

As regras de negócio estabelecidas no desafio ficaram concentradas nos services de cidades e estados, além da conexão com o banco de dados utilizando Prisma.

O Prisma foi utilizado para representar os modelos do banco de dados.

Os schemas foram criados para definir as estruturas de dados esperadas pela API, utilizando o Zod para validação.

Essa estrutura facilita o processo de desenvolvimento e também favorece a visualização da estrutura, ajudando até mesmo na manutenção da aplicação.

### 3. Quais dificuldades encontrou?
No início, tive dificuldade em relação à compatibilidade do TypeScript com o Node.js e as ferramentas utilizadas para executar a aplicação. Foi necessário fazer o downgrade do TypeScript e ajustar a configuração do package.json e tsconfig.json. 
Outra dificuldade surgiu no momento de criar um registro de cidade ou estado que haviam sido excluídos. Como os registros permaneciam no banco de dados, removi a restrição @unique do schema Prisma e ajustei as regras de negócio nos services, permitindo o cadastro de novos registros.

### 4. O que faria diferente se tivesse mais tempo?
Caso tivesse mais tempo, implementaria outras funcionalidades descritas como opcionais no desafio. Adicionaria principalmente Docker para facilitar a configuração do ambiente e um seed de dados para facilitar a execução e apresentação do projeto.

### 5. Como utilizou Inteligência Artificial durante o desenvolvimento?
Utilizei Inteligência artificial principalmente como ferramenta de apoio durante o desenvolvimento, tanto para definir a estrutura ideal do projeto quanto para ajudar na identificação de problemas. Além disso, utilizei o Claude para revisar a estrutura do schema Prisma e corrigir o problema com o soft delete, em que a restrição @unique impedia o cadastro de novas cidades ou estados que possuíam registros que haviam sido excluídos anteriormente.