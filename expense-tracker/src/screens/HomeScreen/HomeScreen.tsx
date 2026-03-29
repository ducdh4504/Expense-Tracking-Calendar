import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Expense } from '../../models/Expense';
import { getExpenses } from '../../services/StorageService';

export default function HomeScreen() {
    const router = useRouter(); 
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const loadData = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <View style={{ marginTop: 50 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10 }}>Home Screen</Text>

            {/* <Button
                title="Go to Add Expense"
                onPress={() => router.push('/add-expense')}
            /> */}
            <Link 
                href="/add-expense" 
                style={{ 
                    backgroundColor: '#007AFF', 
                    color: 'white', 
                    padding: 15, 
                    textAlign: 'center', 
                    margin: 10,
                    borderRadius: 8,
                    fontWeight: 'bold'
                }}
            >
                Go to Add Expense
            </Link>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                        <Text>
                            {item.amount} - {item.note}
                        </Text>
                        <Text>
                            {new Date(item.date).toLocaleDateString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}