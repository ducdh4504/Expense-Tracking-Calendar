import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthService } from '../../services/AuthService';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập Email và Mật khẩu.');
            return;
        }

        setIsLoading(true);
        const result = await AuthService.login(email, password);
        setIsLoading(false);

        if (result.success) {
            router.replace('/'); // Đăng nhập thành công thì về trang chủ
        } else {
            Alert.alert('Đăng nhập thất bại', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>Sign in to manage your expenses</Text>

            <View style={styles.formContainer}>
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

                <TouchableOpacity onPress={() => router.push('/auth/forgot-password' as any)} style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.primaryButton, isLoading && { opacity: 0.7 }]} 
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Sign In</Text>}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/auth/register' as any)}>
                        <Text style={styles.footerLink}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#16a34a', justifyContent: 'center' },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 80 },
    headerSubtitle: { fontSize: 16, color: '#e2e8f0', textAlign: 'center', marginBottom: 40, marginTop: 10 },
    formContainer: { backgroundColor: 'white', flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingTop: 40 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#f3f4f6', borderRadius: 12, padding: 15, marginBottom: 20, fontSize: 16 },
    forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 20 },
    forgotPasswordText: { color: '#16a34a', fontWeight: '600', fontSize: 14 },
    primaryButton: { backgroundColor: '#16a34a', padding: 18, borderRadius: 12, alignItems: 'center' },
    primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
    footerText: { color: '#6b7280', fontSize: 14 },
    footerLink: { color: '#16a34a', fontWeight: 'bold', fontSize: 14 }
});