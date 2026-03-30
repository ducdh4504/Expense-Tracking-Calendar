import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClnUf0gC0kTlvfeTxOQ29hOJJK2dfuaoU",
  authDomain: "myexpenseapp-566d6.firebaseapp.com",
  projectId: "myexpenseapp-566d6",
  storageBucket: "myexpenseapp-566d6.firebasestorage.app",
  messagingSenderId: "501312874542",
  appId: "1:501312874542:web:bbf20368871ce0fa2d57bf",
//   measurementId: "G-BDWL6V6PJ1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);