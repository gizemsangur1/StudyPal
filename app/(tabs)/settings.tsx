import { logout } from "@/authService";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SettingsScreen() {
  const { themeName, setThemeName, theme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      Alert.alert("Hata", "Çıkış yapılamadı.");
    }
  };

  const toggleTheme = () => {
    setThemeName(themeName === "dark" ? "light" : "dark");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{t("settings")}</Text>

      <View style={styles.optionRow}>
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {t("dark_mode")}
        </Text>
        <Switch
          value={themeName === "dark"}
          onValueChange={toggleTheme}
          thumbColor={themeName === "dark" ? "#facc15" : "#ccc"}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={{ color: theme.text, fontWeight: "bold", fontSize: 16 }}>
          🌐 {t("language")}
        </Text>
        <Text
          style={{ color: theme.text, fontWeight: "bold", fontSize: 16 }}
          onPress={() =>
            i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr")
          }
        >
          {i18n.language === "tr" ? "🇹🇷" : "🇬🇧"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.button, { backgroundColor: theme.primary ,width:"100%"}]}
      >
        <Text style={[styles.text, { color: theme.text }]}>{t("logout")} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  button: {
    backgroundColor: "#9B7EBD",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: "center",
    width: "85%",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
