# visorPreciosFeria
Excelente aplicación web que permite entregar de manera visualmente fácil la variación de precios de ganado de la feria FEGOSA (Paillaco) a lo largo de los meses.
Conozca los precios de TODOS los animales subastados durante el año. Además, puede conocer información de años anteriores lo que le permitirá tomar mejores decisiones para maximizar sus ganancias.

# Software requerido

1. Git
2. Docker
3. Docker compose 

# Pasos para ejecutar la aplicación

1.  Clonar repositorio del proyecto: `git clone https://github.com/hernancasanova/visorPreciosFeria.git`
2.  Ingresar a la carpeta "visorPreciosFeria": `cd visorPreciosFeria`
3.  Construir imagen de la API: `docker-compose build app`
4.  Levantar todos los servicios con el comando `docker-compose up`
5.  Acceder a la aplicación visitando la siguiente url: `http://localhost:3000`


4.  Construir imagen de la API: `docker-compose build app`
5.  Levantar servicios del stack de backend: `docker-compose up -d`
6.  Instalar dependencias de php: `docker-compose exec app composer install`
7.  Generar clave de la aplicación de API: `docker-compose exec app php artisan key:generate`
8.  Crear enlace simbolico a carpeta de imagenes: `docker-compose exec app php artisan storage:link`
9.  Ingresar a la carpeta react-reduction ubicada en el mismo nivel que la carpeta rest y ejecutar los siguientes pasos
10. Crear contenedor de la aplicación de react e instalar dependencias: `docker-compose run --rm frontend npm install`
11. Levantar contenedor de la aplicación de react: `docker-compose up -d`


