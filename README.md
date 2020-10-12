# Simple SPA with React + NextJs front-end and Laravel 8 back-end

Layout created with Ant Design and Styled Component.  
JWT user authentication.

## Features:
- Login
- Refresh token
- Reset password 
- Logout
- Admin users CRUD
- Update logged user password
- Update logged user data

## Hosts
127.0.0.1 project.local

## Commands to execute back-end with Docker
Obs: Execute only in backend folder
```
   cp .env.example .env && \
   docker-compose up -d && \ 
   docker-compose exec php composer update && \
   docker-compose exec php php artisan key:generate && \
   docker-compose exec php php artisan migrate --seed && \
   docker-compose exec php php artisan jwt:secret
```

## Commands to execute front-end
Obs: Execute only in backoffice folder
```
    cp .env.example .env.local && \
    yarn dev
```