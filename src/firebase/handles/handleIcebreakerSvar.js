import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

const handleIcebreakerSvar = (svar) => {
  const teamId = auth.currentUser?.uid;

  //Refere til den collectionen vi vil sende til
  const teamRef = collection(firestore, teamId);
  const icebreakerRef = doc(teamRef, "icebreaker");
  const ibSvarRef = collection(icebreakerRef, "svar");
  const personRef = doc(ibSvarRef, svar.id);

  try {
    setDoc(personRef, svar.personSvar);
  } catch (err) {
    console.log("Kunne ikke sende icebreaker svar!", err);
  }
};

export default handleIcebreakerSvar;
