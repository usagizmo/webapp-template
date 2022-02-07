import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { ENV } from '../constants/env'

const app = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: ENV.FIREBASE_API_KEY,
      authDomain: ENV.FIREBASE_AUTH_DOMAIN,
      projectId: ENV.FIREBASE_PROJECT_ID,
      storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
      appId: ENV.FIREBASE_APP_ID,
    })

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
