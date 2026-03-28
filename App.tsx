import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#14182E' }}>
      <Text style={{ color: '#F5A420', fontSize: 24, fontWeight: 'bold' }}>KinderAI</Text>
      <StatusBar style="light" />
    </View>
  );
}
