import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Add Item" component={HomeScreen} />
        <Stack.Screen name="Menu Summary" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
