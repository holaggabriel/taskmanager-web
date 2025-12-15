# Task Manager

Task Manager Web es una aplicación web frontend desarrollada en React para gestionar tareas. Permite a los usuarios crear, editar, eliminar y restaurar tareas de manera visual y sencilla. 

### Tecnologías utilizadas

* React
* Redux

### Requisitos previos

* Node.js v24 o superior
* npm

### Task Manager API (Importante)

Aunque el frontend de **Task Manager** puede ejecutarse y mostrar la interfaz sin la necesidad de tener **Task Manager API** corriendo, **es imprescindible** para realizar operaciones completas con las tareas (crear, editar, eliminar, restaurar).

**Para usar las funcionalidades completas de la aplicación**, necesitarás tener corriendo [**Task Manager API**](https://github.com/holaggabriel/taskmanager-api). Puedes encontrar el código fuente y la documentación allí para configurar y ejecutar la API en tu entorno.

## Instalación

1. Clonar el repositorio:

   ```
   git clone <url-del-repo>
   ```
2. Ingresar al directorio del proyecto:

   ```
   cd <carpeta-del-proyecto>
   ```
3. Instalar dependencias:

   ```
   npm install
   ```

### Configuración de variables de entorno

El frontend necesita conocer la URL de la API (**Task Manager API**). Crear un archivo `.env` a partir del ejemplo.
Es importante mencionar que el puerto de la API (**Task Manager API**) puede variar dependiendo de tu configuración.
```
VITE_API_BASE_URL=http://localhost:3000
```
## Ejecutar el proyecto

```
npm run dev
```

Una vez que la aplicación se ejecute, podrás acceder a ella como en el ejemplo. El puerto puede variar según la configuración, pero por defecto se ejecutará en el puerto 3000. Si el puerto está en uso, React te informará de un puerto alternativo donde se está sirviendo la aplicación.
```
http://localhost:5173/signin
```
## Demostración
https://github.com/user-attachments/assets/706530ad-2a31-4a69-86ee-05fe0564f3fa
