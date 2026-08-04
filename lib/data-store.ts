import { getDataBackendMode, shouldFallbackFromFirebase } from "@/lib/backend-mode";
import * as firestoreData from "@/lib/firestore-data";

export type {
  CollaborationRecord,
  ContentType,
  CreateCollaborationInput,
  CreateProjectInput,
  ProjectContentBlock,
  ProjectRecord,
  UpdateCollaborationInput,
  UpdateProjectInput,
  UserRecord,
} from "@/lib/firestore-data";

const fallbackWarnings = new Set<string>();

async function runWithBackendFallback<T>(
  action: string,
  firebaseOperation: () => Promise<T>,
  sqliteOperation?: () => Promise<T>
): Promise<T> {
  const mode = getDataBackendMode();

  if (mode === "sqlite") {
    if (!sqliteOperation) {
      throw new Error("SQLite/Prisma backend is not available in this production bundle.");
    }

    return sqliteOperation();
  }

  try {
    return await firebaseOperation();
  } catch (error) {
    if (mode === "firestore" || !shouldFallbackFromFirebase(error)) {
      throw error;
    }

    if (!fallbackWarnings.has(action)) {
      fallbackWarnings.add(action);
      console.warn(`[data-store] Falling back to SQLite for ${action}:`, error);
    }

    if (!sqliteOperation) {
      throw error;
    }

    return sqliteOperation();
  }
}

export async function listProjects() {
  return runWithBackendFallback("listProjects", firestoreData.listProjects);
}

export async function getProjectById(id: string) {
  return runWithBackendFallback(
    "getProjectById",
    () => firestoreData.getProjectById(id)
  );
}

export async function getProjectBySlug(slug: string) {
  return runWithBackendFallback(
    "getProjectBySlug",
    () => firestoreData.getProjectBySlug(slug)
  );
}

export async function createProject(input: firestoreData.CreateProjectInput) {
  return runWithBackendFallback(
    "createProject",
    () => firestoreData.createProject(input)
  );
}

export async function updateProject(id: string, input: firestoreData.UpdateProjectInput) {
  return runWithBackendFallback(
    "updateProject",
    () => firestoreData.updateProject(id, input)
  );
}

export async function deleteProject(id: string) {
  return runWithBackendFallback(
    "deleteProject",
    () => firestoreData.deleteProject(id)
  );
}

export async function countExistingProjectsByIds(projectIds: string[]) {
  return runWithBackendFallback(
    "countExistingProjectsByIds",
    () => firestoreData.countExistingProjectsByIds(projectIds)
  );
}

export async function reorderProjects(projectIds: string[]) {
  return runWithBackendFallback(
    "reorderProjects",
    () => firestoreData.reorderProjects(projectIds)
  );
}

export async function listCollaborations() {
  return runWithBackendFallback("listCollaborations", firestoreData.listCollaborations);
}

export async function getCollaborationById(id: string) {
  return runWithBackendFallback(
    "getCollaborationById",
    () => firestoreData.getCollaborationById(id)
  );
}

export async function getCollaborationBySlug(slug: string) {
  return runWithBackendFallback(
    "getCollaborationBySlug",
    () => firestoreData.getCollaborationBySlug(slug)
  );
}

export async function createCollaboration(input: firestoreData.CreateCollaborationInput) {
  return runWithBackendFallback(
    "createCollaboration",
    () => firestoreData.createCollaboration(input)
  );
}

export async function updateCollaboration(
  id: string,
  input: firestoreData.UpdateCollaborationInput
) {
  return runWithBackendFallback(
    "updateCollaboration",
    () => firestoreData.updateCollaboration(id, input)
  );
}

export async function deleteCollaboration(id: string) {
  return runWithBackendFallback(
    "deleteCollaboration",
    () => firestoreData.deleteCollaboration(id)
  );
}

export async function countExistingCollaborationsByIds(collaborationIds: string[]) {
  return runWithBackendFallback(
    "countExistingCollaborationsByIds",
    () => firestoreData.countExistingCollaborationsByIds(collaborationIds)
  );
}

export async function reorderCollaborations(collaborationIds: string[]) {
  return runWithBackendFallback(
    "reorderCollaborations",
    () => firestoreData.reorderCollaborations(collaborationIds)
  );
}

export async function findUserByEmail(email: string) {
  return runWithBackendFallback(
    "findUserByEmail",
    () => firestoreData.findUserByEmail(email)
  );
}

export async function countUsers() {
  return runWithBackendFallback("countUsers", firestoreData.countUsers);
}

export async function createUser(email: string, password: string) {
  return runWithBackendFallback(
    "createUser",
    () => firestoreData.createUser(email, password)
  );
}
