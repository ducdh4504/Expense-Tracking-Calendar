import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthService } from '../../services/AuthService';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập email của bạn.');
            return;
        }

        setIsLoading(true);
        const result = await AuthService.resetPassword(email);
        setIsLoading(false);

        if (result.success) {
            Alert.alert('Thành công', result.message, [
                { text: 'Quay lại Đăng nhập', onPress: () => router.back() }
            ]);
        } else {
            Alert.alert('Lỗi', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Reset Password</Text>
            <Text style={styles.headerSubtitle}>Enter your email to receive a reset link</Text>

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

                <TouchableOpacity 
                    style={[styles.primaryButton, isLoading && { opacity: 0.7 }]} 
                    onPress={handleReset}
                    disabled={isLoading}
                >
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Send Link</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#16a34a', paddingTop: 50 },
    backButton: { paddingHorizontal: 20, marginBottom: 10 },
    backButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    headerSubtitle: { fontSize: 16, color: '#e2e8f0', textAlign: 'center', marginBottom: 30, marginTop: 10, paddingHorizontal: 20 },
    formContainer: { backgroundColor: 'white', flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingTop: 40 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#f3f4f6', borderRadius: 12, padding: 15, marginBottom: 30, fontSize: 16 },
    primaryButton: { backgroundColor: '#16a34a', padding: 18, borderRadius: 12, alignItems: 'center' },
    primaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});