import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../models/Expense';

const KEY = 'expenses';

export const saveExpense = async (expense: Expense) => {
    const existing = await getExpenses();
    const updated = [...existing, expense];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const getExpenses = async (): Promise<Expense[]> => {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
};