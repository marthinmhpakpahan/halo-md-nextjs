"use client";

import { getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export function hasFirebaseConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);
}

export function getFirebaseApp() {
  if (!hasFirebaseConfig()) {
    return null;
  }

  return getApps()[0] ?? initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

export function getGoogleProvider() {
  return new GoogleAuthProvider();
}

export function getProjectsCollection(db: Firestore, uid: string) {
  return collection(db, "users", uid, "projects");
}
