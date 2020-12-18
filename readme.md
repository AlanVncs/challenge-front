

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
<br>

#### Modo de produção (Express)
> `npm start`

Compila o projeto e inicia um servidor HTTP. A página fica disponível em `http://127.0.0.1:1337`.
<br><br>

#### Modo de desenvolvimento (BrowserSync)
> `npm run dev`

Similar ao modo de produção, porém sempre que um arquivo é atualizado (salvo) no diretório `src/`, o projeto é recompilado e a página aberta no navegador é atualizada, agilizando o desenvolvimento.
<br><br>

Obs.: Com o comando `npm build`, é possível apenas gerar os arquivos no diretório `dist/` sem iniciar um servidor HTTP.
<br><br>

## Funcionalidades
##### Carrinho de compras
Ao clicar no ícone do carrinho de compras, um request é feito e o conteúdo do carrinho é exibido com todos os produtos presentes no arquivo `dist/data/products.json`. Ao clicar no ícone novamente ou clicar fora do carrinho, o conteúdo é escondido.
Devido à minha limitação com o CSS, não consegui deixar a barra de rolagem parecida com o layout original.
<br><br>

##### Menu dropdown e dinâmico
Assim com os ítens do carrinho, o conteúdo do menu também é obtido através de uma requisição a um JSON (`dist/data/menu.json`). O menu pode ter vários itens e vários submenus e seu conteúdo é exibido ao passar o mouse por cima.
 <br><br>
 
 
## Detalhes implementação
 
### Tecnologias utilizadas

##### Gulp
O Gulp foi usado para gerenciar o fluxo de trabalho, possibilitando a transpilação de código através de plugins (`gulp-sass` e `gulp-typescript`), detecção automática de mudanças no código (`gulp.watch`) e geração do diretório com os arquivos compilados (`dist/`).
<br><br>

##### Sass e Typescript
Para facilitar o desenvolvimento, o CSS e o Javascript do projeto foram implementados, respectivamente, em Sass e Typescript.
<br><br>

##### BrowserSync
O BrowserSync foi usado como servidor HTTP no modo de de desenvolvimento devido à sua funcionalidade de atualizar a página via código (`browsersync.reload` é chamada pelo Gulp quando alguma mudança de código é detectada). Isso agiliza muito o desenvolvimento, pois dispensa o desenvolvedor da tarefa de atualizar a página para ver as mudanças.
<br><br>

##### Express
Além da sua facilidade de uso, o Express, diferente do BrowserSync, é um servidor HTTP puro e por isso é mais adequado para ser usado no modo de produção.
<br><br>

### Fluxo de trabalho

##### Modo de desenvolvimento
> ```npm run dev```

O Gulp executa a task `default`, que inicia o BrowserSync, compila e move os arquivos para o diretório `dist/`, além de entrar no modo "watch", que recompila o projeto e avisa o BrowserSync sempre alguma alteração for detectada.
<br><br>

##### Modo de execução
> ```npm start```

O Gulp executa a task `build`,  compila e move os arquivos para o diretório `dist/`.  Após isso, o Express é executado através do script `index.js`.
<br><br>
