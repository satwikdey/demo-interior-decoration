import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import fs from "fs";

let firebaseApp: App | null = null;

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function getFirebasePrivateKey(): string | undefined {
  const privateKeyBase64 = getEnv("FIREBASE_PRIVATE_KEY_BASE64");
  if (privateKeyBase64) {
    return Buffer.from(privateKeyBase64, "base64").toString("utf8");
  }

  return getEnv("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n");
}

function getServiceAccountFromFile(): {
  projectId: string;
  clientEmail: string;
  privateKey: string;
} | null {
  const serviceAccountPath =
    getEnv("FIREBASE_SERVICE_ACCOUNT_PATH") ?? getEnv("GOOGLE_APPLICATION_CREDENTIALS");

  if (!serviceAccountPath) {
    return null;
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8")) as {
    project_id?: string;
    client_email?: string;
    private_key?: string;
  };

  if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error(
      "Firebase service account file is missing project_id, client_email, or private_key."
    );
  }

  return {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  };
}

export function getFirebaseAdminApp(): App {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length > 0) {
    firebaseApp = getApps()[0]!;
    return firebaseApp;
  }

  const serviceAccount = getServiceAccountFromFile();
  const projectId =
    serviceAccount?.projectId ?? getEnv("FIREBASE_PROJECT_ID") ?? getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const clientEmail = serviceAccount?.clientEmail ?? getEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = serviceAccount?.privateKey ?? getFirebasePrivateKey();
  const storageBucket = getEnv("FIREBASE_STORAGE_BUCKET") ?? getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");

  if (projectId && clientEmail && privateKey) {
    firebaseApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
      storageBucket,
    });
    return firebaseApp;
  }

  if (projectId) {
    firebaseApp = initializeApp({ projectId, storageBucket });
    return firebaseApp;
  }

  throw new Error(
    "Firebase Admin is not configured. Add FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local."
  );
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}
