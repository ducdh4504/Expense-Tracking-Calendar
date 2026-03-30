import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddExpenseScreen from './src/screens/AddExpense/AddExpenseScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}