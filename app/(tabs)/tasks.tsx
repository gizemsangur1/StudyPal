import CustomButton from "@/components/CustomButton";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const { tasks, addTask, toggleTask } = useTasks();
  const [input, setInput] = useState("");
  const { theme } = useTheme();
    const { t } = useTranslation();
  const handleAdd = () => {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <View style={{ backgroundColor: theme.background, padding: 8, flex: 1 }}>
      <Text
        style={{
          color: theme.text,
          padding: 12,
          fontSize: 16,
        }}
      >
      {t("tasks_title")}
      </Text>

      <TextInput
        style={{
          color: theme.text,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
        }}
        placeholder={t("task_input_placeholder")}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleAdd}
      />
      <CustomButton name={t("add_button")} onPress={handleAdd} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <Text style={[styles.task, item.completed && styles.completed,{ color: theme.text }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{t("no_tasks_text")}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  task: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  empty: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
  },
});
