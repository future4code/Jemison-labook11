
 <h1 align="center"><strong>Projeto Labook</b></strong></h1></div>

<h4>Projeto 
<hr>
O Projeto Labook tem como função, colocar em prática os conceitos de arquitetura de software, como a Arquitetura em três camadas(Data, Controller e Business), rotas com Express Router, Data Trasnfer Object(DTO), arquitetura limpa junto com a Inversão de dependências e introduzindo os conceitos de validação por token e criptografia.

Sendo assim o projeto possuí uma estrutura que simula uma api de redes sociai contendo as entidades prinicipais de usuários e postgens junto com entidades complementares, de amizades, likes e comentários feita inteiramnete em Typescript e SQL.
<hr>

### Projeto Realizado por:
* Renato Alexandrini
---

<h3>Endpoinst do projeto<h3>
<h4>

:yellow_circle: Criar Usuário
>Este endpoint simula o cadastro de um novo usuário na nossa rede social.
Ele não necessita de nenhum tipo de autorização e deve receber os dados nome, email e password através do "body", fazendo a verificação dos dados como: se o email já existe um email igual no banco de dados, se o email de cadastro possui uma estrutura padrão de email (nome@provedor.com) e se a senha é considerada uma senha forte, contendo no mínimo oito caracteres, sendo eles ao menos uma letra maíscula, uma letra minúscula, um número e um caracter especial.

>Após a verificação ele deve gerar um novo usuário contendo a senha criptografada e retornando uma mensagem de sucesso, o novo usuário criado, para verificação e um token que deverá ser utilizado nos demais endpoints.
</br>

:yellow_circle: Login
>Este endpoint simula o login de um usuário, recebendo através do "body" os dados email e senha e fazendo a verificação no banco de dados, por fim retornando um token que será necessário na autenticação dos demais endpoints.

>Como as senhas no banco estão criptografadas, para facilitar o teste do projeto, dentro da pasta "migrations" existe um arquivo em JSON contendo os usuários com as senhas sem a criptografia.
</br>

:yellow_circle: Criar uma Postagem
> Este endpoint, simula a criação de um novo post, sendo necessário a adição do token no "header" para a autorização e então, através do "body" devem ser passados a url de uma imagem, uma descrição e um tipo entre "normal" e "event". sendo este tipo opcional, no caso do dado tipo estar vazio ou não existir no body, por padrão o pos terá o tipo "normal", o ID do autor do post não é adicionado ao "body", pois ele é retirado do token de autenticação do usuário.

>Este endpoint retorna uma mensagem de sucesso e o post recém criado, apenas para facilitar a visualização.
</br>

:green_circle: Buscar um Post através do ID
> Este endpoint deve receber um token no "header" e no "body" o ID de um post, ele então faz a verificação se o post existe no banco de dados e então retorna o post escolhido.
</br>

:green_circle: Buscar um Post através do tipo
>Este endpoint retorna um Post através do seu tipo("normal" ou "event"), para isso é necessário passar através do "header" o token de autenticação e o tipo através do body, como neste endpoint não existe um padrão como o de ciação, obrigatóriamente é necessário passar um dos dois tipos possíveis.

>Este endpoint retorna todos os Posts do tipo escolhdo, ordenados pela data de criação deles.
</br>

:yellow_circle: Criar uma nova amizade
>Este endpoint deve receber através do "header" o token de autenticação e o id de um outro usuário através do "body", então ele verifica se o id do usuário existe no banco de dados, verifica se o id recebido pelo "body" não é igual ao id retirado do token de autorização, verifica se a amizade entre os dois usuários já existe, para então por fim criar uma nova amizade.

>Este endpoint retorna uma mensagem de sucesso e a amizade criada, para a visualização.
</br>

:red_circle: Deletar uma amizade
>Este endpoint deve receber através do "header" o token de autenticação e o id de um outro usuário através do "body", ele verifica se a amizade entre os dois usuários já existe, então ele deleta esta relção de amizade.

>Este endpoint retorna apenas uma mensagem de sucesso na remoção da amizade.
</br>

:yellow_circle: Criar uma relação de like em um Post
>Este endpoint deve receber um token de autorização através do "header" e o ID de um post através do "body", então ele verifica se o post existe no banco de dados e se a relação de like entre o usuário e o post já existe no banco de dados, para então criar a relção.

>Este endpoint retorna uma mensagem de sucesso e a relação criada, para visualização.
</br>

:red_circle: Deletar arelação de like de um Post
>Este endpoint deve receber através do "header" o token de autenticação e o id de um post através do "body", ele verifica se já foi dado o like neste post, então ele deleta esta relção.

>Este endpoint retorna apenas uma mensagem de sucesso na remoção do like.
</br>

:yellow_circle: Criar um comentário
>Este endpoint recebe um token de autorização através do "header" e o id de um post através do "Body", ele apenas verifica se o post informado existe para então criar um comentário, não existindo nenhuma outa restrição, sendo possível o mesmo usuário comentar diversas vezes o mesmo post.

>Este endpoint retorna uma mensagem de sucesso e o comentário, para visualização.
</br>

:green_circle: Buscar os comentários de um usuário
>Endpoint que recebe através da "query" um termo então retorna todos os estudantes que possuam este termo em qualquer parte do nome ou sobrenome.
</br>

:green_circle: Buscar os ultimos Posts dos amigos do usuário
>POR ALGUM MOTIVO ESTE ENDPOINT NÃO FUNCIONA NO DEPLOY, APENAS NO LOCALHOST.

>NO DEPLOY ELE APRESENTA O ERRO NA FUNÇÃO QUE TRANSFORMA O ARRAY DE AMIGOE EM UMA STRING

>EXATAMENTE NA PARTE QUE UTILIZA REPLACEALL(","," ") PARA REMOVER AS VÍRGULAS DA STRING.

>Este endpoint recebe um token de autorização através do "header" e utiliza o ID retirado deste token para retornar os ultimos posts criados pelos amigos do usuário.
por padrão, são exibidos os cinco ultimos posts, porém é possível passar através do "body" um limite maior, sendo que se este limite for menor que cinco ou não existir o endpoint irá manter o padrão de cinco posts.
</br>

---

### Tecnologia Utilizada:
* Typescript

<img src="https://user-images.githubusercontent.com/102265620/205476749-786b35ae-cb86-44ab-bff9-4bd8833284b7.png" width="50px">

* SQL

<img src="https://user-images.githubusercontent.com/102265620/205476861-68520703-8f8b-4dc9-9336-fc7d8b4a0764.jpg" width="50px">

### Link da Documentação via Postman
https://documenter.getpostman.com/view/24755055/2s935oM4kC

### Link do Deploy através do Render
https://projeto-jemison-labook11-vylc.onrender.com
