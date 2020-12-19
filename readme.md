
  
  

![Eplus](https://www.agenciaeplus.com.br/wp-content/themes/eplus/images/agencia-eplus-n-logo.png)

# E-Plus Frontend Challenge

## Pré-requisitos

Embora a implementação do projeto conte com tecnologias como Gulp, Sass e Typescript, os únicos pré-requisitos são:

- Node.js

- Algum gerenciador de pacotes como NPM ou YARN

<br><br>

  

## Como executar

Antes de executar, é necessário baixar o projeto e instalar suas dependências:
```
git clone https://github.com/AlanVncs/challenge-front.git
cd challenge-front
npm install -y
```

Com o projeto baixado, será possível executá-lo de duas formas:
- Modo de produção (Express)
- Modo de desenvolvimento (BrowserSync)
<br><br>
  

#### Modo de produção (Express)

>  `npm run prod`

Compila o projeto e inicia um servidor HTTP. A página fica disponível em `http://127.0.0.1:1337`.
<br><br>


#### Modo de desenvolvimento (BrowserSync)

>  `npm run dev`

Similar ao modo de produção, porém sempre que um arquivo é atualizado (salvo) no diretório `src/`, o projeto é recompilado e a página aberta no navegador é atualizada, agilizando o desenvolvimento.
<br><br>


Obs.: Com o comando `npm run build`, é possível apenas gerar os arquivos no diretório `dist/` sem iniciar um servidor HTTP.
<br><br>

  

## Funcionalidades

##### Carrinho de compras

Ao clicar no ícone do carrinho de compras, um request é feito e o conteúdo do carrinho é exibido com todos os produtos presentes no arquivo `dist/data/products.json`. Ao clicar no ícone novamente ou clicar fora do carrinho, o conteúdo é escondido.
A barra de rolagem do carrinho não ficou parecida com o layout original :/
<br><br>

  

##### Menu dropdown e dinâmico
Assim com os ítens do carrinho, o conteúdo do menu também é obtido através de uma requisição a um JSON (`dist/data/menu.json`). O menu pode ter vários itens e vários submenus e seu conteúdo é exibido ao passar o mouse por cima.
<br><br>



##### Minificação e sourcemaps
Os arquivos Javascript e CSS são minificados pelo Gulp (na verdade, por seus plugins), o que aumenta significativamente a rapidez com que a página é carregada. Além disso, sourcemaps destes arquivos são gerados para facilitar uma eventual depuração via browser.
Como é recomendado, os sourcemaps só ficam disponíveis quando o projeto é executado no modo de desenvolvimento.
Obs.: A política de acesso aos sourcemaps pode ser facilmente modificada através do Express no arquivo `server.js`.
<br><br>
  
  

## Detalhes implementação

### Tecnologias utilizadas

  

##### Gulp

O Gulp foi usado para gerenciar todo o workflow do projeto, concentrando as operações de compilação, minificação, geração dos sourcemaps e iniciação do server HTTP. O seu sistema de tarefas (tasks) proporcionou uma maneira simples de executar ações conforme necessário, como rodar o projeto em modos diferentes com uma simples modificação de comando (ex.: "gulp prod" ou "gulp dev").
Plugins utilizados :`gulp-sass` `gulp-typescript` `gulp-babel-minify` `gulp-sourcemaps`
<br><br>

  

##### Sass e Typescript

Para facilitar o desenvolvimento, o CSS e o Javascript do projeto foram implementados, respectivamente, em Sass e Typescript.
<br><br>

  

##### BrowserSync

O BrowserSync foi usado como servidor HTTP no modo de de desenvolvimento devido à sua funcionalidade de atualizar a página "automaticamente" (`browsersync.reload` é chamada quando alguma mudança de código é detectada pelo `gulp.watch`). Isso agiliza muito o desenvolvimento, pois dispensa o desenvolvedor da tarefa de atualizar a página para ver as mudanças.
<br><br>

  

##### Express
Além da sua facilidade de uso, o Express, diferente do BrowserSync, é um servidor HTTP puro e por isso é mais adequado para ser usado no modo de produção.
<br><br>

  

### Fluxo de execução


##### Modo de desenvolvimento
>  ```npm run dev```

Chama o Gulp no modo de desenvolvimento (`gulp dev`), que compila os arquivos no diretório `dist/` e inicia o BrowserSync.
Simultaneamente, inicia o "watching" dos arquivos no diretório `src/`, fazendo com que sempre que haja alguma alteração neste diretório, os arquivos sejam recompilados/copiados para o diretório `dist/` e o BrowserSync seja notificado.
<br><br>

  

##### Modo de execução
>  ```npm start```

Chama o Gulp no modo de produção (`gulp prod`), que compila os arquivos no diretório `dist/` e inicia o Express (`server.js`).
<br><br>

  

### Considerações finais

O maior desafio foi o CSS, principalmente no que diz respeito à reutilização do código e responsividade da página. Não sei (ainda!) como isso é feito no CSS mas certamente dá para melhorar bastante. De qualquer forma, tentei compensar meu défice em CSS integrando outras tecnologias ao projeto e espero que isso agregue valor.