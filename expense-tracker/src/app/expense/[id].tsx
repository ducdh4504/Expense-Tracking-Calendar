import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { Expense } from '../../models/Expense';
import { getExpenses } from '../../services/StorageService';

export default function ExpenseDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [expense, setExpense] = useState<Expense | null>(null);

    useEffect(() => {
        const load = async () => {
            const data = await getExpenses();
            const found = data.find(e => e.id === id);
            setExpense(found || null);
        };

        load();
    }, [id]);

    if (!expense) {
        return <Text style={{ marginTop: 50 }}>Not found</Text>;
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                {expense.title}
            </Text>

            <Text style={{ fontSize: 20, marginVertical: 10 }}>
                {expense.amount.toLocaleString('vi-VN')} đ
            </Text>

            <Text>{expense.note}</Text>

            <Text style={{ marginTop: 10 }}>
                {new Date(expense.date).toLocaleDateString()}
            </Text>

            {expense.imageUri ? (
                <Image
                    source={{ uri: expense.imageUri }}
                    style={{ width: '100%', height: 200, marginTop: 20 }}
                />
            ) : null}

            <View style={{ marginTop: 20 }}>
                <Button title="Back" onPress={() => router.back()} />
            </View>
        </View>
    );
}