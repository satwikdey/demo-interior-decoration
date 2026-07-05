import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let firebaseApp: App | null = null;

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export function getFirebaseAdminApp(): App {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length > 0) {
    firebaseApp = getApps()[0]!;
    return firebaseApp;
  }

  const projectId = getEnv("FIREBASE_PROJECT_ID") ?? getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const clientEmail = getEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = getEnv("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n");
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
    "Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local."
  );
}

export function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}

export function getFirebaseStorageBucket() {
  const app = getFirebaseAdminApp();
  const bucketName =
    getEnv("FIREBASE_STORAGE_BUCKET") ??
    getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET") ??
    app.options.storageBucket;

  if (!bucketName) {
    throw new Error(
      "Firebase Storage is not configured. Add FIREBASE_STORAGE_BUCKET or NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET to .env.local."
    );
  }

  return getStorage(app).bucket(bucketName);
}
