import CustomButton from "@/components/CustomButton";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons"; // ikon için
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
  const { tasks, addTask, toggleTask, deleteTask } = useTasks(); 
  const [input, setInput] = useState("");
  const { theme,themeName } = useTheme();
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
          <View style={styles.taskRow}>
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.task,
                  item.completed && styles.completed,
                  { color: theme.text },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash-outline" size={20} color={themeName=="light"?"#3D0301":"#EBE8DB" }/>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>{t("no_tasks_text")}</Text>
        }
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
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  task: {
    fontSize: 16,
    paddingVertical: 8,
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
