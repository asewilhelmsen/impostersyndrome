import { auth, firestore } from "./firebase_setup/firebase";
import { collection, getDocs } from "@firebase/firestore";

const getTruthOrLie = async () => {
  //For å hente hvilket team brukeren er logget inn på
  const user = auth.currentUser.uid;

  try {
    const collectionName = user + "_truthOrLie";

    const querySnapshot = await getDocs(collection(firestore, collectionName));

    const newData = [];
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
    });
    return newData;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export default getTruthOrLie;
