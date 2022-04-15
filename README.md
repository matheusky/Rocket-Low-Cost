# Rocket Low Cost
Rockets Low Costs é uma aplicação para lançar seu próprio foguete, Fazendo um cálculo automático de lucro por lançamento.

# Objetivo
Projeto desenvolvido para um Teste de qualificação e com intuito pessoal de aprender e aprimorar meus conhecimentos sobre NextJS.

# [MongoDB](https://www.mongodb.com/)
Para esse projeto foram usadas duas tabelas, uma para os dados de usuários e outra para os foguetes lançados:
1. User: _id, nome, idade
2. Rockets: _id, userID, fogueteID, profit, date, ativo, rocketName, motorType, custo, image*

*salva apenas o link da imagem


# Aplicação
1. Login é feito apenas usando um nome de usuário e confirmando sua idade logo em seguida.
2. Lançamento do foguete ocorre apenas se o mesmo estiver ativo, caso contrario lançamento e a contação de lucros não ocorre.

# Execução
1. Para executar a aplicação basta rodar ``npm install`` para instalar as dependências do projeto e ``npm run dev`` para executar a aplicação.
