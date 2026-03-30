import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { saveExpense, uploadImageToCloudinary } from '../../services/StorageService';

export default function AddExpenseScreen() {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return new Intl.NumberFormat('vi-VN').format(Number(number));
    };

    const handleAmountChange = (text: string) => {
        const raw = text.replace(/\D/g, '');
        setAmount(formatCurrency(raw));
    };

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
        if (!title || !amount) {
            alert("Vui lòng nhập tiêu đề và số tiền!");
            return;
        }

        setIsSaving(true);
        try {
            let finalImageUri = '';

            if (image) {
                console.log("Bắt đầu upload ảnh...");
                const uploadedUrl = await uploadImageToCloudinary(image);
                if (uploadedUrl) {
                    finalImageUri = uploadedUrl;
                }
            }

            const newExpense = {
                id: Date.now().toString(),
                title: title,
                amount: Number(amount.replace(/\D/g, '')),
                note,
                location: '',
                date: new Date().toISOString(),
                imageUri: finalImageUri, 
            };

            await saveExpense(newExpense);

            router.back();

        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
            alert("Đã xảy ra lỗi khi lưu. Vui lòng thử lại!");
        } finally {
            setIsSaving(false);
        }
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
                onChangeText={handleAmountChange}
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