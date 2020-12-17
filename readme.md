
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

Com o projeto baixado, será possível executá-lo de duas formas:
- Modo de produção (Express)
- Modo dev (BrowserSync)
<hr>

#### Modo de produção (Express)
```
npm start
```
Compila o projeto e inicia um servidor HTTP.
A página fica disponível em `http://127.0.0.1:1337`
<hr>

#### Modo dev (BrowserSync)
```
npm run dev
```
Similar ao modo de produção, porém sempre que um arquivo é atualizado (salvo) no diretório `src/`, o projeto é recompilado e a página aberta no navegador é atualizada, agilizando o desenvolvimento.
<hr>

Obs.: Com o comando `npm build`, é possível apenas gerar os arquivos no diretório `dist/` sem iniciar um servidor HTTP

 ## Funcionalidades
 ...
 
 ## Detalhes implementação
 
### Tecnologias utilizadas

##### Gulp
O Gulp foi usado para gerenciar o fluxo de trabalho, possibilitando a transpilação de código através de plugins (`gulp-sass` e `gulp-typescript`), detecção automática de mudanças no código (`gulp.watch`) e geração do diretório com os arquivos compilados (`dist/`).
<br>

##### Sass e Typescript
Para facilitar o desenvolvimento, o CSS e o Javascript do projeto foram implementados, respectivamente, em Sass e Typescript.
<br>

##### BrowserSync
O BrowserSync foi usado como servidor HTTP no modo de de desenvolvimento devido à sua funcionalidade de atualizar a página via código (`browsersync.reload` é chamada pelo Gulp quando alguma mudança de código é detectada). Isso agiliza muito o desenvolvimento, pois dispensa o desenvolvedor da tarefa de atualizar a página para ver as mudanças.
<br>

##### Express
Além da sua facilidade de uso, o Express, diferente do BrowserSync, é um servidor HTTP puro e por isso é mais adequado para ser usado no modo de produção.
<br>

### Fluxo de trabalho

##### Modo de desenvolvimento
> ```npm run dev```

O Gulp executa a task `default`, que inicia o BrowserSync, compila e move os arquivos para o diretório `dist/`, além de entrar no modo "watch", que recompila o projeto e avisa o BrowserSync sempre alguma alteração for detectada.
<br>

##### Modo de produção
> ```npm start```

O Gulp executa a task `build`,  compila e move os arquivos para o diretório `dist/`.  Após isso, o Express é executado através do script `index.js`.
<br>
