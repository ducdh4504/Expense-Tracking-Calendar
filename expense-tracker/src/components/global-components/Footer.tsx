import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
    const router = useRouter();
    const pathname = usePathname();

    // -----------------------------------------
    // GIAO DIỆN 1: DÀNH CHO WEB (FOOTER TO)
    // -----------------------------------------
    if (Platform.OS === 'web') {
        return (
            <View style={styles.webContainer}>
                <View style={styles.webBrandSection}>
                    <Text style={styles.webBrandTitle}>💰 Expense-Tracking-Calendar</Text>
                    <Text style={styles.webDescription}>
                        Track your expenses effortlessly, manage your budget wisely, and achieve your financial goals.
                    </Text>
                </View>

                <View style={styles.webContactSection}>
                    <Text style={styles.webContactTitle}>Contact Us</Text>
                    <Text style={styles.webContactText}>📞 +1 (415) 555-1234</Text>
                    <Text style={styles.webContactText}>✉️ support@expensetracker.com</Text>
                    <Text style={styles.webContactText}>📍 123 Finance Street, San Francisco, CA</Text>
                </View>
            </View>
        );
    }

    // -----------------------------------------
    // GIAO DIỆN 2: DÀNH CHO MOBILE (BOTTOM TABS)
    // -----------------------------------------
    return (
        <View style={styles.mobileContainer}>
            <TouchableOpacity 
                style={styles.mobileTab} 
                onPress={() => router.push('/')}
            >
                <Text style={{ fontSize: 24, color: pathname === '/' ? '#16a34a' : '#6b7280' }}>🏠</Text>
                <Text style={[styles.mobileTabText, pathname === '/' && styles.mobileTabTextActive]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.mobileTab} 
                onPress={() => router.push('/add-expense')}
            >
                <Text style={{ fontSize: 24, color: pathname === '/add-expense' ? '#16a34a' : '#6b7280' }}>➕</Text>
                <Text style={[styles.mobileTabText, pathname === '/add-expense' && styles.mobileTabTextActive]}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.mobileTab} 
                onPress={() => console.log('Go to Settings')}
            >
                <Text style={{ fontSize: 24, color: '#6b7280' }}>⚙️</Text>
                <Text style={styles.mobileTabText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // --- STYLES CHO WEB ---
    webContainer: {
        backgroundColor: '#111827',
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    webBrandSection: { flex: 1, paddingRight: 40 },
    webBrandTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    webDescription: { color: '#d1d5db', fontSize: 14, lineHeight: 22 },
    webContactSection: { flex: 1 },
    webContactTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    webContactText: { color: '#d1d5db', fontSize: 14, marginBottom: 8 },

    // --- STYLES CHO MOBILE ---
    mobileContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingVertical: 10,
        paddingBottom: 25, // Trừ hao vùng vuốt dưới cùng của iPhone
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mobileTab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    mobileTabText: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 4,
    },
    mobileTabTextActive: {
        color: '#16a34a',
        fontWeight: 'bold',
    }
});