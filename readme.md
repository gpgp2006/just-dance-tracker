# Just Dance Tracker
Aplicação web para registrar e organizar pontuações da série de jogos Just Dance. O sistema permite filtrar históricos por edição, plataforma e método de pontuação.

# Pré-requisitos
Para poder executar este projeto, é necessário que tenha o Node.js instalado.

- [Download Node.js](https://nodejs.org/en/download)

# Instalação
Para configurar o ambiente, é necessário seguir os passos abaixo na ordem apresentada:

1. Clonar o Repositório

Através do terminal, faça o download do código fonte, com o comando abaixo.

```
git clone https://github.com/gpgp2006/just-dance-tracker
```


2. Configurar o back-end

Através do terminal, entre na pasta principal.

```
cd just-dance-tracker
```

Após isto, entre na pasta do servidor e instale as dependências.
```
cd server
npm install
```

Então, com os comandos abaixo, gere o banco de dados e rode o servidor.
```
node seed.js
node index.js
```

É necessário manter este terminal aberto para o site funcionar.

3. Configurar o front-end

Em um outro terminal, entre na pasta principal do projeto, no local onde baixou.

Em seguida, entre na pasta do cliente e instale as dependências

```
cd client
npm install
```

Então, por fim, inicie a aplicação, com
```
npm run dev
```
4. O terminal mostrará um link (provavelmente [este](http://localhost:5173)). Entre nesse link para acessar o site.


# Como utilizar
Ao abrir o sistema, você será redirecionado para a tela de login.

É possível fazer login com um usuário pré-cadastrado:

- Usuário: Player1
- Senha: 123

Mas, caso prefira, é possível criar uma conta. Na própria tela de login, basta inserir o nome de usuário que você desejar e o servidor vai verificar se existe uma conta com este nome de usuário. Caso exista, vai pedir a senha. Caso não exista, leva para a tela de cadastro.

Nenhuma verificação de email é feita, exceto para verificar se o texto inserido tem um formato de email.

Para selecionar uma edição, basta selecionar o botão "Ver músicas", logo abaixo a capa e o nome de cada jogo. Por enquanto somente tem algumas músicas, porque eu tenho que inserir e baixar manualmente as informações das músicas e as imagens, e alguns jogos, mais para demonstração, devido à algumas tecnicalidades do próprio Just Dance.

Dentro de cada página de edição, o app não aplicará nenhum filtro automaticamente, mas sim mostrará a pontuação máxima de cada música jogada, com o console e o método de pontuação utilizados para tais pontuações embaixo.

Na parte de cima da página, você pode filtrar a visualização por plataforma e por método de pontuação, que já está separado nos possíveis métodos para cada plataforma em cada jogo. Para as plataformas que possuem somente um método de pontuar, não é possível trocar o método, porque este único método já será escolhido automaticamente.

Para inserir uma pontuação em um jogo, é necessário ativar o switch escrito "Ativar Modo de Edição". No Modo de Edição, quando você expandir uma música, será possível selecionar a plataforma e o método de pontuação usado e adicionar uma pontuação, editar uma pontuação existente ou excluir uma pontuação existente. 

É possível ter mais de uma pontuação em uma mesma música, no mesmo console com o mesmo método de pontuação, mas somente a maior aparecerá sem expandir o menu da música.

Não é possível inserir nenhuma pontuação maior que 13333, já que este é o limite do próprio jogo.

É possível trocar de conta, simplesmente apertando o botão "Sair", ao lado do seu usuário atual, no canto superior direito.

Também não existe nenhuma conta de administrador que permita adicionar edições e músicas, porque na teoria, o banco de dados já está completo, somente necessitando dos usuários adicionarem suas pontuações.

## Banco de dados
Caso tenha algum problema com o banco de dados, você pode rodar ```node seed.js``` dentro da pasta ```just-dance-tracker/server```, para reconstruir o banco de dados. Todos os dados inseridos previamente, como usuários e pontuações, serão deletados e o banco de dados voltará ao seu estado padrão.

## Informações extras
Eu não adicionei todas as músicas de todos os jogos porque, para fazer isso, eu preciso fazer manualmente. Eu preciso inserir o nome de cada música, artista, ID interno do jogo e baixar a imagem referente à música, o que demanda muito tempo sem um scraper.

Eu também não adicionei todas as edições pelos mesmos motivos supracitados.

Mas, as edições que foram adicionadas, não foram escolhidas aleatoriamente. O sistema de estrelas do Just Dance funciona da seguinte maneira:

| Pontuação     | Estrelas                     |
|---------------|------------------------------|
| 0 - 1999      | 0 estrelas                   |
| 2000 - 3999   | 1 estrela                    |
| 4000 - 5999   | 2 estrelas                   |
| 6000 - 7999   | 3 estrelas                   |
| 8000 - 9999   | 4 estrelas                   |
| 10000- 10999  | 5 estrelas                   |
| 11000 - 11999 | Superstar (Just Dance 2017+) |
| 12000 - 13333 | Megastar (Just Dance 2018+)  |

Nem todas as edições possuem a pontuação denominada de "Superstar" ou "Megastar". 

Então, dos jogos adicionados entre a edição 1 e 2016, se você colocar qualquer pontuação entre 10000 e 13333, será considerado 5 estrelas.

Na edição de 2017, se você colocar qualquer valor maior que 11000, será somente "Superstar", porque ainda não existia "Megastar" neste jogo.

Por fim, nas edições de 2018 até as mais recentes, a quantidade de estrelas seguem os valores da tabela acima.

Com isso em mente, é possível perceber que dos Just Dances adicionados, o 4, 2014 e 2015 só vão até 5 estrelas. O 2017 vai até Superstar e o 2022 vai até Megastar.