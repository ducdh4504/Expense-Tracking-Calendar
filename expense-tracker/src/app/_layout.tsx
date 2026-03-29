import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            {/* Cấu hình cho trang chủ (index.tsx) */}
            <Stack.Screen 
                name="index" 
                options={{ title: 'Trang chủ', headerShown: false }} 
            />
            {/* Cấu hình cho trang thêm chi tiêu (add-expense.tsx) */}
            <Stack.Screen 
                name="add-expense" 
                options={{ title: 'Thêm chi tiêu', presentation: 'modal' }} 
            />
        </Stack>
    );
}