# API de cadastro de pessoas

## Sobre o que se trata?

<p>Projeto criado para a participação de um processo de seleção para uma vaga de desenvolvedor web.</p>

<p>Foi criado uma API para cadastro de informações sobre pessoas e visualização desses dados. Para tal foi utilizado JavaScript com NodeJS e o framework Express. O banco de dados utilizado foi o MySQL.</p>

[Link para o frontend do projeto](https://github.com/jonribeiro23/cadastro-pessoas-front).


## Instruções

- Certifique-se de possuir o NodeJS e o MySQL instalados e configurados
- Crie um banco de dados e insira as credenciais no arquivo <strong>.env</strong> e no arquivo <strong>config.json</strong>, na pasta config
- Abra a pasta raiz do projeto via CLI
- Execute os seguintes comandos:
    - npm install
    - npx sequelize db:migrate
    - npx sequelize-cli db:seed:all
    - npx nodemon ./src/index.js
    - Pronto. A API já pode ser utilizada!

<p>A url da API já está inserida no frontend do projeto. Caso queira mudar a url ou a porta, certifique-se de alterar também no frontend. No backend a alteração pode ser feita no arquivo <strong>.env</strong>. As instruções da sobre como realizar a alteração se encontram no readme do frontend.</p>


## Rotas

<h3>"/"</h3>
<p>A rota raiz é destinada para a realização de login. Ela recebe uma requisição via <strong>POST</strong>. Deve ser passado um JSON contendo um email e uma senha para autenticação:</p>

```javascript
    {
        "email": "admin@admin.com",
        "password": "admin"
    }
```
<p>Ao executar o seed, o banco já foi populado com as credenciais necessária para a realização da autenticação. Caso a autenticação tenha sido bem sucedida, será retornado o seguinte JSON:</p>

```javascript
    {
        "success": true,
        "data": [
            {
                "user": {
                    "email": "admin@admin.com"
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NzQyOTExLCJleHAiOjE2Mzc3NTAxMTF9.A2-cHxClwHwMOuJLP_8_NM2nsMQv0kvb33yWcxd6_aA"
            }
        ],
        "error": []
    }
```

<p>Caso contrário, será retornado um JSON contendo uma uma mensagem de erro: </p>

```javascript
    {
        "success": false,
        "data": [],
        "error": [
            "<Mensagem do erro>"
        ]
    }
```

<h3>"/create-user"</h3>
<p>Rota reponsável pela inserção dos dados de uma pessoa no banco de dados. Para ter acesso à esta rota é necessário que o token de autenticação seja enviado no header da requisição. Ex:</p>

> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3NzQyOTExLCJleHAiOjE2Mzc3NTAxMTF9.A2-cHxClwHwMOuJLP_8_NM2nsMQv0kvb33yWcxd6_aA

<p>Deve ser enviado um JSON contendo as seguintes informações</p>

```javascript
    {
        "nome": "<string>",
        "email": "<string>",
        "telefone": "<string>",
        "dataNascimento": "<date> ano-mes-dia",
        "sexo": "<enum> m || f"
    }
```

<p>Possui o seguinte retorno: </p>

```javascript
    {
        "success": true,
        "data": "Usuário cadastrado com sucesso.",
        "error": []
    }
```


<h3>"/get-users"</h3>
<p>Esta rota retorna todos os usuário cadastrados em ordem decrescente de 'id'.</p>

```javascript
    {
        "success": true,
        "data": [
            {
                "id": 20,
                "nome": "Fulano de Tal",
                "email": "fulano@email.com",
                "telefone": "9999999999",
                "dataNascimento": "1995-08-23",
                "sexo": "M"
            },
            ...
            {
                "id": 1,
                "nome": "Beltrana Xpto",
                "email": "beltrana@email.com",
                "telefone": "12345678910",
                "dataNascimento": "1985-12-23",
                "sexo": "F"
            }
        ],
        "error": []
    }
```
