import React from 'react';
import { DeviceEventEmitter, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    const handleLogoPress = () => {
        DeviceEventEmitter.emit('scrollToTop');
    };

    return (
        <View style={styles.container}>
            {/* Menu Icon */}
            <TouchableOpacity onPress={() => console.log('Mở Menu')}>
                <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>

            {/* Logo & Title */}
            <TouchableOpacity style={styles.titleContainer} onPress={handleLogoPress}>
                <View style={styles.logoRow}>
                    <Text style={styles.walletIcon}>👛</Text>
                    <Text style={styles.appTitle}>ExpenseTracker</Text>
                </View>
                {/* Chỉ hiện Subtitle trên Web cho đỡ chật diện tích Mobile */}
                {Platform.OS === 'web' && (
                    <Text style={styles.appSubtitle}>Smart Finance Management</Text>
                )}
            </TouchableOpacity>

            {/* User Avatar */}
            <TouchableOpacity onPress={() => console.log('Mở Profile')} style={styles.avatar}>
                <Text style={styles.avatarText}>ME</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16a34a',
        paddingHorizontal: 15,
        // Tự động bỏ khoảng trống thừa nếu chạy trên Web
        paddingTop: Platform.OS === 'web' ? 15 : 50,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4, // Đổ bóng cho Android
        shadowColor: '#000', // Đổ bóng cho iOS/Web
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    menuIcon: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    titleContainer: { alignItems: 'center' },
    logoRow: { flexDirection: 'row', alignItems: 'center' },
    walletIcon: { fontSize: 20, marginRight: 6 },
    appTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    appSubtitle: { color: '#e2e8f0', fontSize: 12, marginTop: 2 },
    avatar: {
        backgroundColor: '#4ade80', width: 36, height: 36,
        borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'white',
    },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 12 }
});