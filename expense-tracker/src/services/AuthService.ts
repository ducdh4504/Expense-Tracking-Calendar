import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile } from '../models/User';

export const AuthService = {
    // 1. ĐĂNG KÝ
    register: async (email: string, password: string) => {
        try {
            // Tạo tài khoản trên Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Gửi email xác thực
            await sendEmailVerification(user);

            // Tạo object chuẩn theo Model
            const newUserProfile: UserProfile = {
                uid: user.uid,
                email: user.email || email,
                createdAt: new Date().toISOString()
            };

            // Lưu Hồ sơ vào Firestore Database (Collection 'users')
            await setDoc(doc(db, 'users', user.uid), newUserProfile);

            return { success: true, message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },

    // 2. ĐĂNG NHẬP
    login: async (email: string, password: string) => {
        try {
            // Xác thực với Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Lấy thêm thông tin Profile (username) từ Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let userProfile: UserProfile | null = null;
            
            if (userDocSnap.exists()) {
                // Ép kiểu dữ liệu trả về chuẩn theo Model
                userProfile = userDocSnap.data() as UserProfile;
            }

            return { 
                success: true, 
                user: user,             // Chứa thông tin session của Firebase
                profile: userProfile    // Chứa username và các thông tin mở rộng của bạn
            };
        } catch (error: any) {
            return { success: false, error: 'Email hoặc mật khẩu không chính xác.' };
        }
    },

    // 3. QUÊN MẬT KHẨU
    resetPassword: async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true, message: 'Đã gửi link đặt lại mật khẩu vào email của bạn!' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },

    // 4. ĐĂNG XUẤT
    logout: async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
};