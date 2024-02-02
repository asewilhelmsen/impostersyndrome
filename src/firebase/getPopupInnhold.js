import { auth, firestore } from "./firebase_setup/firebase";
import { getDoc, doc, collection } from "@firebase/firestore";

//Tar inn stringen til det popup innholdet man er ute etter (eksempel: "velkommen" for teksten som skal stå i starten)
const getPopupInnhold = async (popupInnhold) => {
  try {
    const popupsRef = collection(firestore, "popup");
    const innholdRef = doc(popupsRef, popupInnhold);
    const docSnap = await getDoc(innholdRef);
    return docSnap.data();
  } catch (error) {
    console.error("Error getting popup innhold: ", error);
  }
};

export default getPopupInnhold;
