import { auth, firestore } from "./firebase_setup/firebase";
import { getDoc, doc, collection } from "@firebase/firestore";

const getRetro = async (retroNummer) => {
  const teamId = auth.currentUser.uid;

  try {
    const teamRef = collection(firestore, teamId);
    const retroRef = doc(teamRef, "retrospektiv" + retroNummer);
    const docSnap = await getDoc(retroRef);

    return docSnap.data();
  } catch (error) {
    console.error("Error getting documents for Maal: ", error);
  }
};

export default getRetro;
