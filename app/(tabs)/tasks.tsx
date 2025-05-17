import {
  addTaskToCloud,
  deleteTaskFromCloud,
  getTasksFromCloud,
} from "@/actions/tasks";
import CustomButton from "@/components/CustomButton";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const { tasks, addTask, toggleTask, deleteTask, clearTasks } = useTasks();
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { theme, themeName } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      clearTasks();
      const cloudTasks = await getTasksFromCloud();
      cloudTasks.forEach((task) => {
        const parsedDate = task.dueDate ? new Date(task.dueDate) : null;
        addTask(task.title, parsedDate, task.id, task.completed);
      });
    } catch (err) {
      console.log("Görevler yüklenemedi:", err);
    }
  };

  const handleAdd = async () => {
    if (input.trim() === "") return;
    const taskId = addTask(input, dueDate);
    await addTaskToCloud(input, dueDate);
    if (dueDate) {
      await scheduleTaskNotification(input, dueDate);
    }
    setInput("");
    setDueDate(null);
  };

  async function scheduleTaskNotification(title: string, dueDate: Date) {
    try {
      const threeHoursBefore = new Date(dueDate.getTime() - 3 * 60 * 60 * 1000);
      const secondsUntil = Math.floor(
        (threeHoursBefore.getTime() - Date.now()) / 1000
      );

      if (secondsUntil <= 0) {
        console.log("⏰ Bildirim zamanı geçmiş. Planlama yapılmadı.");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Görev Yaklaşıyor!",
          body: `\"${title}\" görevine 3 saat kaldı.`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsUntil,
          repeats: false,
        },
      });
    } catch (error: any) {
      Alert.alert("Hata", "Bildirim planlanamadı: " + error.message);
    }
  }

  return (
    <View style={{ backgroundColor: theme.background, padding: 8, flex: 1 }}>
      <Text style={{ color: theme.text, padding: 12, fontSize: 16 }}>
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

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={{ color: theme.text, marginBottom: 8 }}>
          {dueDate
            ? dueDate.toLocaleDateString()
            : t("select_date")}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate && dueDate) {
              const updated = new Date(dueDate);
              updated.setFullYear(selectedDate.getFullYear());
              updated.setMonth(selectedDate.getMonth());
              updated.setDate(selectedDate.getDate());
              setDueDate(updated);
            } else if (selectedDate) {
              setDueDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={{ color: theme.text, marginBottom: 8 }}>
          {dueDate
            ? dueDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : t("select_time")}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime && dueDate) {
              const updated = new Date(dueDate);
              updated.setHours(selectedTime.getHours());
              updated.setMinutes(selectedTime.getMinutes());
              setDueDate(updated);
            } else if (selectedTime) {
              setDueDate(selectedTime);
            }
          }}
        />
      )}

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
                {item.title}{" "}
                {item.dueDate &&
                  (() => {
                    const date = new Date(item.dueDate);
                    return `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )} ${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}`;
                  })()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                deleteTask(item.id);
                await deleteTaskFromCloud(item.id);
              }}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color={themeName === "light" ? "#3D0301" : "#EBE8DB"}
              />
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
/*  trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsUntil,
          repeats: false,
        }, */
