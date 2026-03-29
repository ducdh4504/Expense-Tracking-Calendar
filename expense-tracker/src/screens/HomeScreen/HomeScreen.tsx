import { View, Text, Button, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getExpenses } from '../../services/StorageService';
import { Expense } from '../../models/Expense';
import { Image } from 'react-native';

export default function HomeScreen({ navigation }: any) {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const loadData = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadData);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ marginTop: 50 }}>
            <Text>Home Screen</Text>

            <Button
                title="Go to Add Expense"
                onPress={() => navigation.navigate('AddExpense')}
            />
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10 }}>
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