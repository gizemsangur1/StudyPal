import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> StudyPal</Text>
      <Text style={styles.subtitle}>
        Verimli çalışma asistanına hoş geldin!
      </Text>

      <View style={styles.buttonGroup}>
        <CustomButton name="Pomodoro Zamanlayıcı" path="/timer" />
        <CustomButton name="Görevlerim" path="/tasks" />
        <CustomButton name="İstatistikler" path="/stats" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: "center" },
  buttonGroup: { gap: 12, width: "100%" },
  button: { backgroundColor: "#9B7EBD", borderRadius: 50, padding: 10 },
  text: { color: "white", textAlign: "center" },
});
