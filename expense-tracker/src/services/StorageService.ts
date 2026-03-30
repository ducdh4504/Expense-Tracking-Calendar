// src/services/StorageService.ts
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Platform } from 'react-native';
import { db } from '../config/firebase';
import { Expense } from '../models/Expense';

const COLLECTION_NAME = 'expenses';

export const saveExpense = async (expense: Expense) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, expense.id);
        await setDoc(docRef, expense);
        console.log("Đã lưu thành công lên Firebase!");
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu: ", error);
    }
};

export const getExpenses = async (): Promise<Expense[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const expenses: Expense[] = [];

        querySnapshot.forEach((doc) => {
            expenses.push(doc.data() as Expense);
        });

        // Sắp xếp ngày mới nhất lên đầu
        return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        return [];
    }
};

// export const uploadImageToCloudinary = async (imageUri: string) => {
//     if (!imageUri || imageUri.startsWith('http')) return imageUri;

//     const CLOUD_NAME = 'dkom4tenf'; 
//     const UPLOAD_PRESET = 'expense-personal-app'; 

//     const data = new FormData();
//     data.append('file', {
//         uri: imageUri,
//         type: 'image/jpeg', 
//         name: `expense_${Date.now()}.jpg`
//     } as any);
//     data.append('upload_preset', UPLOAD_PRESET);

//     try {
//         console.log("Đang tải ảnh lên Cloudinary...");
//         const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//             method: 'POST',
//             body: data,
//             headers: {
//                 'Accept': 'application/json',
//             }
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             console.error("Lỗi từ Cloudinary:", result);
//             return null;
//         }

//         console.log("Upload thành công!", result.secure_url);
//         return result.secure_url; 

//     } catch (error) {
//         console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
//         return null;
//     }
// };
export const uploadImageToCloudinary = async (imageUri: string) => {
    if (!imageUri || imageUri.startsWith('http')) return imageUri;

    const CLOUD_NAME = 'dkom4tenf';
    const UPLOAD_PRESET = 'expense-personal-app';
    const data = new FormData();
    try {
        if (Platform.OS === 'web') {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            data.append('file', blob);
        } else {
            // 👉 MOBILE
            data.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: `expense_${Date.now()}.jpg`
            } as any);
        }

        data.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: data,
            }
        );

        const result = await res.json();

        if (!res.ok) {
            console.error(result);
            return null;
        }

        return result.secure_url;

    } catch (error) {
        console.error(error);
        return null;
    }
};