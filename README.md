# krusty Task Manager - WebApp

Esse é o repositório da aplicação web Krusty Task Manager.

------------

### Módulos

O projeto está dividido em módulos:

- Application: Módulo responsável por conter os arquivos do AngularJS, como controllers, directives, services, views.
- Assets: Módulo responsável por conter os arquivos estáticos da aplicação, como CSS, fontes, imagens e também arquivos do 
[Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework) "Bootstrap")

### Como rodar a aplicação

Para executar o projeto, é necessário ter o Node instalado.

Executar o comando para fazer o download das dependências do projeto:

``` 
npm install 
```

Ao instalar as dependências, você deverá rodar um servidor, para que a aplicação possa funcionar corretamente, 
pode ser feito com Node,Gulp ou outro a sua escolha.

Para facilitar, usaremos [Gulp](https://gulpjs.com/ "Gulp") para servir como servidor.

Instale o Gulp com o seguinte comando

```
npm install gulp-cli -g
```

Feito isso, já poderá executar a tarefa que foi criada no arquivo `gulpfile.js`

```
gulp
```

Se tudo ocorrer bem, a aplicação irá abrir em seu navegador!

### Aplicação online

Está implementado nesse repositório o deploy automático com o [Heroku](https://www.heroku.com/what "Heroku"), sendo assim, qualquer alteração feita nele, refletirá automaticamente na aplicação.

Você pode acessar a aplicação clicando [aqui](https://krustytaskmanager.herokuapp.com "Krusty Task Manager").
