import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(
      JSON.parse(import.meta.env.FIREBASE_SERVICE_ACCOUNT || '{}'),
    ),
  });
}

export const dbAdmin = getFirestore();
