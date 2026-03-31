// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeApp } from 'firebase/app';
// // @ts-ignore
// import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyClnUf0gC0kTlvfeTxOQ29hOJJK2dfuaoU",
//   authDomain: "myexpenseapp-566d6.firebaseapp.com",
//   projectId: "myexpenseapp-566d6",
//   storageBucket: "myexpenseapp-566d6.firebasestorage.app",
//   messagingSenderId: "501312874542",
//   appId: "1:501312874542:web:bbf20368871ce0fa2d57bf",
// //   measurementId: "G-BDWL6V6PJ1"
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native'; // Thêm import Platform

const firebaseConfig = {
    apiKey: "AIzaSyClnUf0gC0kTlvfeTxOQ29hOJJK2dfuaoU",
    authDomain: "myexpenseapp-566d6.firebaseapp.com",
    projectId: "myexpenseapp-566d6",
    storageBucket: "myexpenseapp-566d6.firebasestorage.app",
    messagingSenderId: "501312874542",
    appId: "1:501312874542:web:bbf20368871ce0fa2d57bf",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Khởi tạo Auth linh hoạt theo môi trường
let firebaseAuth;

if (Platform.OS === 'web') {
    // Trên Web: Dùng getAuth mặc định (nó tự lưu phiên bằng LocalStorage của trình duyệt)
    firebaseAuth = getAuth(app);
} else {
    // Trên Mobile (iOS/Android): Dùng initializeAuth với AsyncStorage
    firebaseAuth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

export const auth = firebaseAuth;