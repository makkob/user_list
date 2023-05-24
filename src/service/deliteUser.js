import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const firestore = getFirestore();

// Обробка видалення користувача
export const handleDeleteUser = async (id) => {
  try {
    await deleteDoc(doc(firestore, "user", id));
    console.log("Користувач успішно видалений з ID:", id);
  } catch (error) {
    console.error("Помилка при видаленні користувача:", error);
  }
};
