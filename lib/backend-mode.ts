export type DataBackendMode = "auto" | "firestore" | "sqlite";

const FALLBACK_FIREBASE_MESSAGES = [
  "Firebase Admin is not configured",
  "Could not load the default credentials",
  "Could not load the default Google application credentials",
  "Firebase Storage is not configured",
  "Cloud Firestore API has not been used",
  "SERVICE_DISABLED",
];

function normalizeMode(value: string | undefined): DataBackendMode {
  const mode = value?.trim().toLowerCase();

  if (mode === "firestore" || mode === "firebase") {
    return "firestore";
  }

  if (mode === "sqlite" || mode === "prisma") {
    return "sqlite";
  }

  return "auto";
}

export function getDataBackendMode(): DataBackendMode {
  return normalizeMode(process.env.DATA_BACKEND);
}

export function shouldFallbackFromFirebase(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return FALLBACK_FIREBASE_MESSAGES.some((message) => error.message.includes(message));
}
