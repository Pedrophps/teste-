
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // On the server, we need to check if an app has been initialized, otherwise
  // we initialize one.
  // On the client, we just want to initialize the app.
  // We are relying on the fact that the first time this function is called
  // it is on the server.
  if (typeof window === 'undefined') {
    if (getApps().length === 0) {
      return getSdks(initializeApp(firebaseConfig));
    } else {
      return getSdks(getApp());
    }
  }
  
  if (getApps().length > 0) {
    return getSdks(getApp());
  }
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
