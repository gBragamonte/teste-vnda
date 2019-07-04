# Repositorio demonstrativo

## Dados de ambiente

- NodeJs v10.16.0
- NPM v6.10.0
- Docker v18.09.7, build 2d0083d
- Docker Compose v1.24.0, build 0aa59064
- API rodando na porta 3001 (fixo)

### Requisitos

#### Opcao 1 . Docker Compose

- Docker instalado localmente;
- Docker Compose instalado localmente;

#### Opcao 2. Tradicional

- NodeJs >= v10.16.0
- NPM >= NPM v6.10.0

## Como executar?

### Docker Compose

Clone o arquivo da raiz, _.env.example_ com novo nome de _.env_ e preencha o campo com sua chave de autenticacao.

Execute
```
docker-compose up -d
```

e confira a aplicacao em _http://localhost_

### Tradicional

Va ate a pasta *api*, clone o arquivo, _.env.example_ com novo nome de _.env_ e preencha o campo com sua chave de autenticacao.

Abra o terminal e execute:

```
npm i
npm start
```

Navegue ate a pasta *app*, na raiz do repo, e execute:


```
npm i
npm start
```

Provavelmente a aplicacao abrira seu browser, mas caso nao abra, confira a aplicacao em _http://localhost:3000_
