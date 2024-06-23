<div align="center">
    <h1>GZAPPY</h1>
    <a href="https://gzappy.com"><img src="https://img.shields.io/badge/GZAPPY-API-blue" alt="GZAPPY API" /></a>
    <a href="https://www.npmjs.com/package/gzappy-js"><img src="https://img.shields.io/npm/v/gzappy-js?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/gzappy-js"><img src="https://img.shields.io/npm/dt/gzappy-js?maxAge=3600" alt="npm downloads" /></a>
</div>

## Introdução

GZAPPY-JS é um pacote JavaScript que facilita a integração com a API de WhatsApp da GZAPPY.

## Funcionalidades

- **Envio de mensagens** ✅
- **Envio de mídias** ✅
- **Envio de mensagens para grupos** ✅
- **Agendamento de mensagens** ✅
- Criar instância ⏱️
- Listar instâncias ⏱️
- Editar instância ⏱️
- Desconectar instância ⏱️
- Reconectar instância ⏱️
- Novo lead ⏱️
- Listar leads ⏱️
- Editar lead ⏱️
- Excluir lead ⏱️
- Listar grupos ⏱️
- Editar grupo ⏱️
- Excluir grupo ⏱️
- Criar Tag ⏱️
- Listar Tags ⏱️
- Editar Tag ⏱️
- Excluir Tag ⏱️

## Autenticação

A partir da versão 0.0.16, a autenticação é feita através do cabeçalho `Authorization` com o API Token gerado no painel da GZAPPY.

## Documentação

Você pode encontrar a documentação completa em [https://docs.gzappy.com](https://docs.gzappy.com).

## Instalação

Para instalar o GZAPPY, execute o seguinte comando:

```bash
npm install gzappy-js
```

## Uso

Este é um exemplo simples de como configurar e usar esta biblioteca. Você pode ler mais em [https://docs.gzappy.com](https://docs.gzappy.com).

```js
// Importação do módulo gzappy-js
import gzappy from 'gzappy-js'

// Definição das variáveis de ambiente
const token = process.env.GZAPPY_API_TOKEN
const instanceId = process.env.GZAPPY_INSTANCE_ID

// Criação de uma instância do gzappy client
const gClient = new gzappy({ token, instanceId })

// Enviando mensagens
const messages = [
  'Olá, tudo bem?',
  'Você tem um novo agendamento marcado, Sr Cliente',
]
const phones = ['5511999999999']

gClient
  .sendMessage(messages, phones)
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
```

## Envio de mídias

```js
const message = 'Confira o anexo!'
const mediaUrl = 'https://example.com/path/to/media.jpg'

gClient
  .sendMedia(message, mediaUrl, phones)
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
```

## Envio de Mensagens para Grupos

```js
const groups = ['group1_id', 'group2_id']

gClient
  .sendGroupMessage(messages, groups)
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
```

## Agendamento de Mensagens

```js
const scheduleUtcDate = 'YYYY-MM-DDTHH:mm:ss+00'

gClient
  .scheduleMessage(messages, phones, scheduleUtcDate)
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
```
