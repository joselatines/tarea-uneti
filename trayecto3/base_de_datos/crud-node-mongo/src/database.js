const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Department operations
async function createDepartment(data) {
  return await prisma.department.create({ data });
}

async function getAllDepartments() {
  return await prisma.department.findMany({
    include: {
      officers: true,
      cases: true
    }
  });
}

async function getDepartmentById(id) {
  return await prisma.department.findUnique({
    where: { id },
    include: {
      officers: true,
      cases: true
    }
  });
}

async function updateDepartment(id, data) {
  return await prisma.department.update({
    where: { id },
    data
  });
}

async function deleteDepartment(id) {
  return await prisma.department.delete({
    where: { id }
  });
}

// Officer operations
async function createOfficer(data) {
  return await prisma.officer.create({ data });
}

async function getAllOfficers() {
  return await prisma.officer.findMany({
    include: {
      department: true,
      cases: true
    }
  });
}

async function getOfficerById(id) {
  return await prisma.officer.findUnique({
    where: { id },
    include: {
      department: true,
      cases: true
    }
  });
}

async function updateOfficer(id, data) {
  return await prisma.officer.update({
    where: { id },
    data
  });
}

async function deleteOfficer(id) {
  return await prisma.officer.delete({
    where: { id }
  });
}

// Case operations
async function createCase(data) {
  return await prisma.case.create({
    data,
    include: {
      officer: true,
      department: true,
      evidence: true,
      suspects: true
    }
  });
}

async function getAllCases() {
  return await prisma.case.findMany({
    include: {
      officer: true,
      department: true,
      evidence: true,
      suspects: true
    }
  });
}

async function getCaseById(id) {
  return await prisma.case.findUnique({
    where: { id },
    include: {
      officer: true,
      department: true,
      evidence: true,
      suspects: true
    }
  });
}

async function updateCase(id, data) {
  return await prisma.case.update({
    where: { id },
    data,
    include: {
      officer: true,
      department: true,
      evidence: true,
      suspects: true
    }
  });
}

async function deleteCase(id) {
  return await prisma.case.delete({
    where: { id }
  });
}

// Evidence operations
async function createEvidence(data) {
  return await prisma.evidence.create({
    data,
    include: {
      case: true
    }
  });
}

async function getAllEvidence() {
  return await prisma.evidence.findMany({
    include: {
      case: true
    }
  });
}

async function getEvidenceById(id) {
  return await prisma.evidence.findUnique({
    where: { id },
    include: {
      case: true
    }
  });
}

async function updateEvidence(id, data) {
  return await prisma.evidence.update({
    where: { id },
    data,
    include: {
      case: true
    }
  });
}

async function deleteEvidence(id) {
  return await prisma.evidence.delete({
    where: { id }
  });
}

// Suspect operations
async function createSuspect(data) {
  return await prisma.suspect.create({
    data,
    include: {
      case: true
    }
  });
}

async function getAllSuspects() {
  return await prisma.suspect.findMany({
    include: {
      case: true
    }
  });
}

async function getSuspectById(id) {
  return await prisma.suspect.findUnique({
    where: { id },
    include: {
      case: true
    }
  });
}

async function updateSuspect(id, data) {
  return await prisma.suspect.update({
    where: { id },
    data,
    include: {
      case: true
    }
  });
}

async function deleteSuspect(id) {
  return await prisma.suspect.delete({
    where: { id }
  });
}

// Cleanup function
async function disconnect() {
  await prisma.$disconnect();
}

module.exports = {
  // Department operations
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  
  // Officer operations
  createOfficer,
  getAllOfficers,
  getOfficerById,
  updateOfficer,
  deleteOfficer,
  
  // Case operations
  createCase,
  getAllCases,
  getCaseById,
  updateCase,
  deleteCase,
  
  // Evidence operations
  createEvidence,
  getAllEvidence,
  getEvidenceById,
  updateEvidence,
  deleteEvidence,
  
  // Suspect operations
  createSuspect,
  getAllSuspects,
  getSuspectById,
  updateSuspect,
  deleteSuspect,
  
  // Utility functions
  disconnect
};
