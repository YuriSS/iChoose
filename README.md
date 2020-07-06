# iChoose

## Tecnologias
1. [Express](https://expressjs.com/)
2. [React](https://reactjs.org/)
3. [Redux](https://redux.js.org/)
4. [Styled Components](https://styled-components.com/)
5. [Tachyons](https://tachyons.io/)
6. [Data.Maybe](https://github.com/folktale/data.maybe)

## Requerimentos
* Node >= v14


## Configurações
Por padrão o servidor irá rodar na porta 80, caso tenha intenção de mudar a porta, sete uma variável de ambiente BACKEND_PORT com o valor desejado.

Os arquivos que são gerados pelo build montam as url com valores relativos. Caso tenha intenção de mudar o hostname das request (Caso queira executar o servidor de desenvolvimento, por exemplo), sete uma variável de ambiente REACT_HOST com o valor desejado.


## Scripts
⋅⋅* npm run test
Rodar testes uniários

⋅⋅* npm start
Iniciar o servidor da aplicação com os arquivos de build

⋅⋅* npm run start_backend
Iniciar o servidor da aplicação com Watcher e autoreload

⋅⋅* npm run start_frontend
Iniciar um servidor de desenvolvimeto para o frontend com Watcher e autoreload

⋅⋅* npm run build_frontend
Iniciar rotina de build dos arquivos estáticos