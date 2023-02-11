# __Double V Partners prueba tecnica__

Esta proyecto consiste en desarrollar dos pruebas tecnincas de frontend y backend para Double V Partners usando las siguientes tecnologías:

- HTML
- CSS
- JS
- PHP

# Fronted

Esta prueba consiste en hacer uso de la api de [Github](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28) para listar los usarios en una tabla y tambien mostrar un grafico de los seguidores de cada usuario consultado.<br>
![xamp](./assets/exampleWeb.jpg)

## Intalación
---------------------
Para poder ejecutar el projecto se debe de usar un servidor local como [xampp](https://www.apachefriends.org/) o un paquete de nodejs como [http-serve](https://www.npmjs.com/package/http-server). Explicare como hacer la instalacion del projecto con los dos.

### Proceso XAMP
1. Clonar el projecto en el directorio __C:\xampp\htdocs__ con el comando
```
git clone https://github.com/orjuela45/Double-V-partners.git
```
2. Ejecutar Xamp<br>
![xamp](./assets/xamp.jpg)
3. Ir a la siguiente dirección web (Cambiar el puerto si se usa otro)
```
http://localhost:80/Frontend%20test/
```
con estos pasos ya se ejecutar la app 

### Proceso http-serve
1. Clonar el projecto en el directorio que se desee
```
git clone https://github.com/orjuela45/Double-V-partners.git
```
2. Abrir una terminal en el directorio Frontend test y ejecutar el siguiete comando
```
http-server -o
```
![http-server](./assets/http-server.png)
Se abrira una pestaña en el navegador predeterminado ejecutando la app

## Recomendaciones
---------------------
La api de github tiene un limite de peticiones gratuitas, por lo que se recomienda generar un token para tener una mayor cantidad de peticiones a la api. En este [enlace](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) podras ver como crear un token y para agregarlo al proyecto debes hacer lo siguiente.

1. Ir al archivo __Frontend test\js\env.example.js__ y cambiarlo por __env.example__

2. En la sección de github-token agregas el token que generaste (Nota: yo deje el que utilice para el desarrollo, puede que este en un futuro ya no sirva)

con esto ya tendras una mayor cantidad de peticiones a la api de github