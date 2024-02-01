import { auth, firestore } from "./firebase_setup/firebase";
import { getDoc, doc, collection } from "@firebase/firestore";

const getMaal = async () => {
  const teamId = auth.currentUser.uid;

  try {
    const teamRef = collection(firestore, teamId);
    const forventningerRef = doc(teamRef, "forventninger");
    const maalRef = collection(forventningerRef, "maal");
    const startAktRef = doc(maalRef, "startAktMaal");
    const docSnap = await getDoc(startAktRef);
    return docSnap.data();
  } catch (error) {
    console.error("Error getting documents for Maal: ", error);
  }
};

export default getMaal;
