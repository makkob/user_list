import { updateDoc } from "firebase/firestore";
import { collection, doc, getFirestore } from "firebase/firestore";

const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

export const updateUser = async (userId, userData) => {
  try {
    const userDocRef = doc(collectionRef, userId);
    await updateDoc(userDocRef, userData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
