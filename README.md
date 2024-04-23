# proyecto-final-equipo08

## Preparación de entorno
Clona el directorio del proyecto:

    git clone https://github.com/juditmaria/projecte-m7.git

En caso de no tener el composer, instalar **composer** desde cero ('proyecto-final-equipo08'):

    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"

Cambia el nombre de *composer.phar* a *composer*:

    mv composer.phar composer

Si no, instala las **dependencias de Composer** que *no se incluyen en el control de versiones* debido a las restricciones establecidas en el archivo **.gitignore** ('proyecto-final-equipo08/laravel'):

    php .././composer install

En caso de usar sqlite habrá que crear en */laravel/database* el archivo *database.sqlite*. Con los comandos de migrate de php podremos hacer y desacer las tablas del proyecto.

Comandos de migrate:
  php artisan migrate:status
  php artisan migrate
  php artisan migrate:rollback
  php artisan migrate:fresh

Comandos de seeders:
  php artisan db:seed

Al iniciar el proyecto por primera vez ejecutaremos las migraciones para la creación de la base de datos:
 **php artisan migrate**


Creacion del archivo **.env**:

    nano .env





# RUTAS

## controllers
    laravel/app/Http/Controllers

## models
    laravel/app/Models

## migrations
    laravel/database/migrations

## seeders
    laravel/database/seeders

## database
    laravel/database/database.sqlite

## .env
    laravel/.env
    
    
