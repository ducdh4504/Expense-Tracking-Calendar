export interface Expense {
    id: string;
    title: string;
    amount: number;
    note?: string;
    location?: string;
    date: string;
    imageUri?: string;
}