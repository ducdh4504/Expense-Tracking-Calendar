import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Footer from '../components/global-components/Footer';
import Header from '../components/global-components/Header';
import { auth } from '../config/firebase';

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const segments = useSegments();
    const pathname = usePathname();

    // 1. Lắng nghe trạng thái đăng nhập từ Firebase
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (initializing) setInitializing(false);
        });
        return subscriber; // Cleanup function
    }, []);

    // 2. Điều hướng tự động (Auth Guard)
    useEffect(() => {
        if (initializing) return; // Đang check thì khoan làm gì cả

        const inAuthGroup = (segments[0] as string) === 'auth';

        if (!user && !inAuthGroup) {
            // Nếu chưa đăng nhập VÀ không ở các trang auth -> Bắt về trang Login
            router.replace('/auth/login' as any);
        } else if (user && inAuthGroup) {
            // Nếu đã đăng nhập VÀ lại đang cố vào trang Login/Register -> Đẩy về trang chủ
            router.replace('/');
        }
    }, [user, initializing, segments]);

    // Màn hình chờ trong lúc Firebase kiểm tra phiên đăng nhập cũ
    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    // 3. Ẩn Header & Footer nếu đang ở các trang Auth
    const isAuthScreen = pathname?.startsWith('/auth');

    return (
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
            {/* Chỉ render Header nếu KHÔNG phải là trang Auth */}
            {!isAuthScreen && <Header />}

            <View style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="add-expense" options={{ title: 'Add Expense', presentation: 'modal' }} />
                    <Stack.Screen name="expense/[id]" options={{ title: 'Expense Detail' }} />

                    {/* Khai báo các trang Auth để ẩn đi header mặc định của Expo */}
                    <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                    <Stack.Screen name="auth/register" options={{ headerShown: false }} />
                    <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
                </Stack>
            </View>

            {/* Chỉ render Footer nếu KHÔNG phải là trang Auth */}
            {!isAuthScreen && <Footer />}
        </View>
    );
}