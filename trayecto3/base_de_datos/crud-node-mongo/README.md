# Sistema de Gestión Policial API

API REST para la gestión de un departamento de policía, incluyendo oficiales, casos, evidencias y sospechosos.

## Estructura del Proyecto

```
crud-node-mongo/
├── prisma/
│   └── schema.prisma    # Definición del esquema de la base de datos
├── src/
│   ├── app.js          # Aplicación principal y rutas
│   └── database.js     # Utilidades de base de datos
├── requests/           # Archivos de prueba para la API
│   ├── departments.http
│   ├── officers.http
│   ├── cases.http
│   ├── evidence.http
│   └── suspects.http
└── .env               # Variables de entorno
```

## Modelos de Datos

### Departamento (Department)
- ID (automático)
- Nombre
- Ubicación
- Jefe
- Fecha de creación/actualización

### Oficial (Officer)
- ID (automático)
- Número de placa (único)
- Nombre
- Apellido
- Rango
- URL de imagen (opcional)
- Departamento
- Estado (Activo/Permiso/Retirado)
- Fecha de ingreso
- Fecha de creación/actualización

### Caso (Case)
- ID (automático)
- Número de caso (único)
- Título
- Descripción
- Estado (Abierto/Cerrado/En Investigación)
- Prioridad (Alta/Media/Baja)
- Oficial asignado
- Departamento
- Fecha de creación/actualización

### Evidencia (Evidence)
- ID (automático)
- Nombre
- Tipo
- Descripción
- Ubicación
- URL de imagen
- Caso relacionado
- Fecha de creación/actualización

### Sospechoso (Suspect)
- ID (automático)
- Nombre
- Apellido
- Edad
- Descripción
- URL de imagen (opcional)
- Estado (Buscado/En Custodia/Liberado)
- Caso relacionado
- Fecha de creación/actualización

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en .env:
```
DATABASE_URL="mongodb://localhost:27017/police_department"
PORT=3000
```

3. Generar el cliente de Prisma:
```bash
npx prisma generate
```

4. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints de la API

### Departamentos
- POST /api/departments - Crear departamento
- GET /api/departments - Listar departamentos
- GET /api/departments/:id - Obtener departamento
- PUT /api/departments/:id - Actualizar departamento
- DELETE /api/departments/:id - Eliminar departamento

### Oficiales
- POST /api/officers - Registrar oficial
- GET /api/officers - Listar oficiales
- GET /api/officers/:id - Obtener oficial
- PUT /api/officers/:id - Actualizar oficial
- DELETE /api/officers/:id - Eliminar oficial

### Casos
- POST /api/cases - Crear caso
- GET /api/cases - Listar casos
- GET /api/cases/:id - Obtener caso
- PUT /api/cases/:id - Actualizar caso
- DELETE /api/cases/:id - Eliminar caso

### Evidencias
- POST /api/evidence - Registrar evidencia
- GET /api/evidence - Listar evidencias
- GET /api/evidence/:id - Obtener evidencia
- PUT /api/evidence/:id - Actualizar evidencia
- DELETE /api/evidence/:id - Eliminar evidencia

### Sospechosos
- POST /api/suspects - Registrar sospechoso
- GET /api/suspects - Listar sospechosos
- GET /api/suspects/:id - Obtener sospechoso
- PUT /api/suspects/:id - Actualizar sospechoso
- DELETE /api/suspects/:id - Eliminar sospechoso

## Pruebas

El directorio `requests/` contiene archivos .http que pueden ser utilizados con la extensión REST Client de VSCode para probar la API. Cada archivo contiene ejemplos de todas las operaciones CRUD para cada entidad.

Para probar:
1. Instalar la extensión "REST Client" en VSCode
2. Abrir cualquier archivo .http
3. Hacer clic en "Send Request" sobre cualquier petición
4. Para peticiones que requieren IDs, reemplazar [ID_XXX] con IDs reales

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Prisma ORM
- REST Client (para pruebas)

## Características

- CRUD completo para todas las entidades
- Relaciones entre entidades
- Soporte para imágenes (URLs)
- Validación de datos
- Manejo de errores
- Mensajes en español
- Documentación de endpoints
