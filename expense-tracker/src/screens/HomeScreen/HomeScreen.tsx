import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Expense } from '../../models/Expense';
import { getExpenses } from '../../services/StorageService';

export default function HomeScreen() {
    const router = useRouter();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    
    // Tham chiếu đến FlatList để có thể gọi hàm cuộn
    const flatListRef = useRef<FlatList>(null);

    // Lắng nghe sự kiện click vào logo từ Header để cuộn lên trên cùng
    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('scrollToTop', () => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        });
        return () => subscription.remove();
    }, []);

    const loadData = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        // Bỏ paddingTop: 50 ở đây vì _layout.tsx đã có Header
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
            
            {/* LIST CHI TIÊU */}
            <FlatList
                ref={flatListRef}
                data={expenses}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                
                // Thêm padding dưới cùng để danh sách không bị lẹm vào Floating Button
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 15 }}

                // GẮN KHỐI HEADER CỦA DANH SÁCH VÀO ĐÂY
                ListHeaderComponent={() => (
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            My Expenses Today
                        </Text>

                        <View style={{
                            backgroundColor: '#16a34a',
                            padding: 20,
                            borderRadius: 16,
                            marginVertical: 15
                        }}>
                            <Text style={{ color: 'white' }}>Total Spent</Text>
                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
                                {total.toLocaleString('vi-VN')} đ
                            </Text>
                        </View>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 5 }}>
                            Recent Transactions
                        </Text>
                    </View>
                )}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/expense/[id]',
                                params: { id: item.id }
                            })
                        }
                        style={{
                            backgroundColor: '#fff',
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center', 
                            shadowColor: '#000',  
                            shadowOpacity: 0.05,
                            shadowRadius: 5,
                            elevation: 2
                        }}
                    >
                        {/* Cột trái: Title và Note */}
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {item.title}
                            </Text>
                            {item.note ? (
                                <Text style={{ color: '#6b7280', marginTop: 4 }}>
                                    {item.note}
                                </Text>
                            ) : null}
                        </View>

                        {/* Cột phải: Amount và Date */}
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {item.amount.toLocaleString('vi-VN')} đ
                            </Text>
                            <Text style={{ color: '#9ca3af', marginTop: 4, fontSize: 12 }}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* FLOATING BUTTON */}
            <TouchableOpacity
                onPress={() => router.push('/add-expense')}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    backgroundColor: '#16a34a',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5, // Thêm độ nổi cho app
                    shadowColor: '#000', // Đổ bóng cho Web/iOS
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 }
                }}
            >
                <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}