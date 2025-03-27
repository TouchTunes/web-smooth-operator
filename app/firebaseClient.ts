import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNeaFY5OjLy_JP5BSVgFxvBMUKMBRvOVY',
  authDomain: 'web-smooth-operator.firebaseapp.com',
  projectId: 'web-smooth-operator',
  storageBucket: 'web-smooth-operator.firebasestorage.app',
  messagingSenderId: '688506765961',
  appId: '1:688506765961:web:c061a4f936d874e8757c58',
  measurementId: 'G-1H0HRSL6C6',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
