# Actualización v0.0.5v (Alpha)

- mejora en la estructura de la base de datos
- correciones en el css del inventario
- mejoras en el inventario_new


## Errores Conocidos

- no e encontrado

# Ejecución

## Requisitos
- Go (latest)
- Node.js (latest)
- C Compiler (se recomienda usar TDM-GCC)

## Dependencias

Primero, accede a la carpeta donde clonaste el proyecto y abre una terminal.

### Frontend
Ubica tu terminal en la carpeta del frontend (`frontend/inventario_visual`) y ejecuta el siguiente comando:

```bash
npm install
```

> Esto instalará todas las dependencias del frontend.

Para ejecutar el frontend, utiliza:

```bash
npm run dev
```

### Backend
Una vez instaladas las dependencias del frontend, ubica la terminal en la carpeta del backend.
Dentro de la carpeta `backend`, ejecuta el siguiente comando:

```bash
go run main.go
```

Esto instalará las dependencias necesarias y ejecutará el servidor.

## Pasos a Futuro

- Incorporar un sistema de búsqueda en el inventario.
- Mejorar el diseño y los estilos CSS.