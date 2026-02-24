# actualizacion v2.1

- se agrego el hash a la contraseña del usuario
- se corrigieron algunas rutas en el main.go
- se actualizo la migracion de la base de datos

# ejecucion 

requisitos
- go (latest)
- nodejs (latest)
- C compiler (recomiendo usar el tdm-gcc)

## dependencias

primero debemos entrar la carpeta donde clonaste el proyecto alli abriras una terminal.
una vez abierta usaras cd para moverte entre los directores

ubica tu terminal en la carpeta del frontend aqui ejecuta el siguiente comando:

```
npm i
```

> esto instala todas las dependencias de la parte del frontend.

para ejecutar el frontend debes de ejecutar 

```
npm run dev
```

una vez hayas intalado las dependencias del frontend y probado que el frontend funciona.
ubicaras la terminal en la carpeta del backend.
estando en la carpeta del backend ejecutaras el siguiente comando en la terminal.

```
go run main.go
```

esto instalara todas las dependencias ademas que tambien ejecutara el proyecto 

## pasos a futuro:

- crear un sistema de hash para el registro de usuario
- incorporar un sistema de busqueda en el inventario
- mejorar el estilo css