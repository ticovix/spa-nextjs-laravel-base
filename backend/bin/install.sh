#!/usr/bin/env bash

SCRIPTPATH=$(dirname "$BASH_SOURCE")

if [[ $SCRIPTPATH == "." ]]; then
    cd ../
fi

echo "Criando .env a partir do .env.example"
cp ./.env.example ./.env

echo "OK!"

echo "Iniciando instalação.."
sudo chmod +x ./bin/compose && \
./bin/compose up -d && \
./bin/compose exec php composer update && \
./bin/compose exec php php artisan key:generate && \
./bin/compose exec php php artisan migrate --seed && \
echo "Instalado com sucesso!";
