import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export type TaskFromCloud = {
  id: string;
  title: string;
  dueDate: string | null;
  completed: boolean;
};

export const addTaskToCloud = async (title: string, dueDate?: Date | null) => {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "users", user.uid, "tasks"), {
    title,
    dueDate: dueDate ? dueDate.toISOString() : null,
    completed: false,
    createdAt: new Date().toISOString(),
  });
};

export const getTasksFromCloud = async (): Promise<TaskFromCloud[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const querySnapshot = await getDocs(collection(db, "users", user.uid, "tasks"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      dueDate: data.dueDate || null,
      completed: data.completed ?? false,
    };
  });
};
export const deleteTaskFromCloud = async (taskId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const taskRef = doc(db, "users", user.uid, "tasks", taskId);
  await deleteDoc(taskRef);
};

