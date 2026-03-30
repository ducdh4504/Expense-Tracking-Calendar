import { Stack } from 'expo-router';
import { View } from 'react-native';
import Footer from '../components/global-components/Footer';
import Header from '../components/global-components/Header';

export default function RootLayout() {
    return (
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
            <Header />

            <View style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen 
                        name="index" 
                        options={{ headerShown: false }} 
                    />

                    <Stack.Screen 
                        name="add-expense" 
                        options={{ 
                            title: 'Add Expense',
                            presentation: 'modal' 
                        }} 
                    />

                    <Stack.Screen 
                        name="expense/[id]" 
                        options={{ title: 'Expense Detail' }} 
                    />
                </Stack>
            </View>

            <Footer />
        </View>
    );
}