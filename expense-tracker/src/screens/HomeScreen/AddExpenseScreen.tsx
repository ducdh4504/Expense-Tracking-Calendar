import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { saveExpense } from '../../services/StorageService';
import * as ImagePicker from 'expo-image-picker';

export default function AddExpenseScreen({ navigation }: any) {
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

        navigation.goBack();
    };

    return (
        <View style={{ marginTop: 50, padding: 20 }}>
            <Text>Title:</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Text>Amount:</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Text>Note:</Text>
            <TextInput
                value={note}
                onChangeText={setNote}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Button title="Pick Image" onPress={pickImage} />

            <Button title="Save" onPress={handleSave} />
        </View>
    );
}