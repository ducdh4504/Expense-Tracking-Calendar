import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { saveExpense } from '../../services/StorageService';

export default function AddExpenseScreen() {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        const newExpense = {
            id: Date.now().toString(),
            title: title,
            amount: Number(amount),
            note,
            location: '',
            date: new Date().toISOString(),
            imageUri: image || '',
        };

        await saveExpense(newExpense);
        
        router.back(); 
    };

    return (
        <View style={{ marginTop: 50, padding: 20 }}>
            <Text>Title:</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Text>Amount:</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Text>Note:</Text>
            <TextInput
                value={note}
                onChangeText={setNote}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />

            <Button title="Pick Image" onPress={pickImage} />
            <View style={{ marginTop: 20 }}>
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    );
}