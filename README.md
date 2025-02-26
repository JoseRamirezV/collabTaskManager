# Descripción

Aplicación CRUD que gestiona tareas en equipo. Cada tarea incluye: título, descripción, fecha de vencimiento, prioridad y estado (pendiente/En proceso/completada).

## Funcionalidad:

1. Implementación Login y Registro:
   - [x] Los usuarios deben registrarse con nombre, correo y contraseña. 
   - [x] Usar JWT para gestionar sesiones.
2. Funcionalidad CRUD:
   - [x] Crea, edita, elimina y lista tareas.
   - [x] Permite a los usuarios cambiar el estado de las tareas.
   - [x] Filtra tareas por prioridad o estado.
3. Base de datos:
   - [x] Usa MongoDB para almacenar los datos de usuarios y tareas.
   - [x] Relaciona usuarios con sus tareas.
4. Frontend:
   - [x] Cuenta con interfaz gráfica funcional creada con React.
   - [x] Tiene validación de formularios para los campos de las tareas.
5. Backend:
   - [x] Backend construido con Node.js y Express.
   - [x] Protege rutas con autenticación.

# Instrucciones de instalación

## Ejecutar en Dev

1. Clonar repositorio
2. Crear copia de archivo `.env.template` y renombrar a `.env` tanto en carpeta frontend como en backend y llenar sus respectivas variables
3. Instalar dependencias, ejecutar `npm install` en carpeta origen (COLLABTASKMANAGER)
4. Correr proyecto en modo desarrollo, ejecutar `npm run dev`

## Ejecutar en producción

1. Seguir pasos de 1 al 3 de sección [Ejecutar de Dev](#ejecutar-en-dev)
2. Crear build del proyecto ```npm run build```
3. Correr proyecto ```npm run start```
