const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Ruta básica - Endpoint de bienvenida y verificación de API
app.get('/', (req, res) => {
  res.json({ message: 'Sistema de Gestión Policial API' });
});

// Rutas de Departamentos
// Crea un nuevo departamento
app.post('/api/departments', async (req, res) => {
  try {
    const department = await prisma.department.create({
      data: req.body
    });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene todos los departamentos con sus oficiales y casos
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        officers: true,
        cases: true
      }
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene un departamento específico por ID con sus oficiales y casos
app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        officers: true,
        cases: true
      }
    });
    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualiza la información de un departamento
app.put('/api/departments/:id', async (req, res) => {
  try {
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Elimina un departamento del sistema
app.delete('/api/departments/:id', async (req, res) => {
  try {
    await prisma.department.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Oficiales
// Registra un nuevo oficial en el sistema
app.post('/api/officers', async (req, res) => {
  try {
    const officer = await prisma.officer.create({
      data: {
        ...req.body,
        joinDate: new Date(req.body.joinDate)
      }
    });
    res.json(officer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene todos los oficiales con su departamento y casos asignados
app.get('/api/officers', async (req, res) => {
  try {
    const officers = await prisma.officer.findMany({
      include: {
        department: true,
        cases: true
      }
    });
    res.json(officers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene información detallada de un oficial específico
app.get('/api/officers/:id', async (req, res) => {
  try {
    const officer = await prisma.officer.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
        cases: true
      }
    });
    if (!officer) {
      return res.status(404).json({ error: 'Oficial no encontrado' });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualiza la información de un oficial
app.put('/api/officers/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.joinDate) {
      updateData.joinDate = new Date(req.body.joinDate);
    }
    
    const officer = await prisma.officer.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(officer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Elimina un oficial del sistema
app.delete('/api/officers/:id', async (req, res) => {
  try {
    await prisma.officer.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Oficial eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Casos
// Crea un nuevo caso con sus relaciones
app.post('/api/cases', async (req, res) => {
  try {
    const case_ = await prisma.case.create({
      data: req.body,
      include: {
        officer: true,
        department: true,
        evidence: true,
        suspects: true
      }
    });
    res.json(case_);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene todos los casos con información relacionada
app.get('/api/cases', async (req, res) => {
  try {
    const cases = await prisma.case.findMany({
      include: {
        officer: true,
        department: true,
        evidence: true,
        suspects: true
      }
    });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene información detallada de un caso específico
app.get('/api/cases/:id', async (req, res) => {
  try {
    const case_ = await prisma.case.findUnique({
      where: { id: req.params.id },
      include: {
        officer: true,
        department: true,
        evidence: true,
        suspects: true
      }
    });
    if (!case_) {
      return res.status(404).json({ error: 'Caso no encontrado' });
    }
    res.json(case_);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualiza la información de un caso
app.put('/api/cases/:id', async (req, res) => {
  try {
    const case_ = await prisma.case.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        officer: true,
        department: true,
        evidence: true,
        suspects: true
      }
    });
    res.json(case_);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Elimina un caso del sistema
app.delete('/api/cases/:id', async (req, res) => {
  try {
    await prisma.case.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Caso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Evidencias
// Registra una nueva evidencia para un caso
app.post('/api/evidence', async (req, res) => {
  try {
    const evidence = await prisma.evidence.create({
      data: req.body,
      include: {
        case: true
      }
    });
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene todas las evidencias registradas
app.get('/api/evidence', async (req, res) => {
  try {
    const evidence = await prisma.evidence.findMany({
      include: {
        case: true
      }
    });
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene información detallada de una evidencia específica
app.get('/api/evidence/:id', async (req, res) => {
  try {
    const evidence = await prisma.evidence.findUnique({
      where: { id: req.params.id },
      include: {
        case: true
      }
    });
    if (!evidence) {
      return res.status(404).json({ error: 'Evidencia no encontrada' });
    }
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualiza la información de una evidencia
app.put('/api/evidence/:id', async (req, res) => {
  try {
    const evidence = await prisma.evidence.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        case: true
      }
    });
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Elimina una evidencia del sistema
app.delete('/api/evidence/:id', async (req, res) => {
  try {
    await prisma.evidence.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Evidencia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Sospechosos
// Registra un nuevo sospechoso en un caso
app.post('/api/suspects', async (req, res) => {
  try {
    const suspect = await prisma.suspect.create({
      data: req.body,
      include: {
        case: true
      }
    });
    res.json(suspect);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene todos los sospechosos registrados
app.get('/api/suspects', async (req, res) => {
  try {
    const suspects = await prisma.suspect.findMany({
      include: {
        case: true
      }
    });
    res.json(suspects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtiene información detallada de un sospechoso específico
app.get('/api/suspects/:id', async (req, res) => {
  try {
    const suspect = await prisma.suspect.findUnique({
      where: { id: req.params.id },
      include: {
        case: true
      }
    });
    if (!suspect) {
      return res.status(404).json({ error: 'Sospechoso no encontrado' });
    }
    res.json(suspect);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualiza la información de un sospechoso
app.put('/api/suspects/:id', async (req, res) => {
  try {
    const suspect = await prisma.suspect.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        case: true
      }
    });
    res.json(suspect);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Elimina un sospechoso del sistema
app.delete('/api/suspects/:id', async (req, res) => {
  try {
    await prisma.suspect.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Sospechoso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`
API Endpoints:

Departamentos:
  POST   /api/departments     - Crear departamento
  GET    /api/departments     - Listar departamentos
  GET    /api/departments/:id - Obtener departamento
  PUT    /api/departments/:id - Actualizar departamento
  DELETE /api/departments/:id - Eliminar departamento

Oficiales:
  POST   /api/officers     - Registrar oficial
  GET    /api/officers     - Listar oficiales
  GET    /api/officers/:id - Obtener oficial
  PUT    /api/officers/:id - Actualizar oficial
  DELETE /api/officers/:id - Eliminar oficial

Casos:
  POST   /api/cases     - Crear caso
  GET    /api/cases     - Listar casos
  GET    /api/cases/:id - Obtener caso
  PUT    /api/cases/:id - Actualizar caso
  DELETE /api/cases/:id - Eliminar caso

Evidencias:
  POST   /api/evidence     - Registrar evidencia
  GET    /api/evidence     - Listar evidencias
  GET    /api/evidence/:id - Obtener evidencia
  PUT    /api/evidence/:id - Actualizar evidencia
  DELETE /api/evidence/:id - Eliminar evidencia

Sospechosos:
  POST   /api/suspects     - Registrar sospechoso
  GET    /api/suspects     - Listar sospechosos
  GET    /api/suspects/:id - Obtener sospechoso
  PUT    /api/suspects/:id - Actualizar sospechoso
  DELETE /api/suspects/:id - Eliminar sospechoso
  `);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
