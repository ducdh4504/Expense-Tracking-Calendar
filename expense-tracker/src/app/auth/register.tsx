import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthService } from '../../services/AuthService';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ các trường.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
            return;
        }

        setIsLoading(true);
        // Đã cập nhật chỉ truyền email và password
        const result = await AuthService.register(email, password);
        setIsLoading(false);

        if (result.success) {
            Alert.alert('Thành công', result.message, [
                { text: 'OK', onPress: () => router.replace('/auth/login' as any) }
            ]);
        } else {
            Alert.alert('Đăng ký thất bại', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>Start tracking your expenses today</Text>

            <View style={styles.formContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="your.email@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity 
                        style={[styles.primaryButton, isLoading && { opacity: 0.7 }]} 
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Sign Up</Text>}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.footerLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

// Tái sử dụng chung styles với Login để đồng bộ UI
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#16a34a', paddingTop: 60 },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    headerSubtitle: { fontSize: 16, color: '#e2e8f0', textAlign: 'center', marginBottom: 30, marginTop: 10 },
    formContainer: { backgroundColor: 'white', flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingTop: 40 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#f3f4f6', borderRadius: 12, padding: 15, marginBottom: 20, fontSize: 16 },
    primaryButton: { backgroundColor: '#16a34a', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, paddingBottom: 30 },
    footerText: { color: '#6b7280', fontSize: 14 },
    footerLink: { color: '#16a34a', fontWeight: 'bold', fontSize: 14 }
});