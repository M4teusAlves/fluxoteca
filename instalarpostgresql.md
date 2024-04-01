# Primeiro Passo

- Acessar o [Site do PostgreSQL](https://www.postgresql.org/download/)
- Escolha a versão que desejar:
  - No windows siga com o auxilar de instalações sem problemas e termine de carregar a instalação.
  - No linux prossiga com os seguintes comandos:
 
    ```sh
    sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

    sudo apt-get update

    sudo apt-get -y install postgresql
    ```