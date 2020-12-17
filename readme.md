![Eplus](https://www.agenciaeplus.com.br/wp-content/themes/eplus/images/agencia-eplus-n-logo.png)

# E-Plus Frontend Challenge

(Em construção)

## Pré-requisitos
Embora a implementação do projeto conte com tecnologias como Gulp, Sass e Typescript, os únicos pré-requisitos são:
- Node.js
- Algum gerenciador de pacotes como NPM ou YARN

## Como executar
Antes de executar, é necessário baixar o projeto e instalar suas dependências
```
git clone https://github.com/AlanVncs/challenge-front.git
cd challenge-front
npm install -y
```
O projeto possui duas formas de ser executado:
- Modo de produção (Express)
- Modo dev (BrowserSync)

#### Modo de produção (Express)
Neste modo, será criado um servidor http que escutará requisições na porta `1337`
```
npm start
```

#### Modo dev (BrowserSync)
Neste modo sempre que um arquivo é atualizado (salvo) no diretório `src`, a página aberta no navegador é atualizada.
```
npm run dev
```

Obs.:
- Em ambos os modos, a página ficará acessível através da url `http://127.0.0.1:1337`
- É possível apenas gerar os arquivos (sem iniciar um servidor http) com o comando `npm build`

### Funcionalidades e descrição da implementação
