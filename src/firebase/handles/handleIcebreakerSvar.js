import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore, auth } from "../firebase_setup/firebase";

//Fil for å legge til funskjoner som håndterer det som har med truth or lie å gjøre

//Lage type/interface her!!!!! til svar
const handleIcebreakerSvar = (svar) => {
  const teamId = auth.currentUser?.uid;

  //Refere til den collectionen vi vil sende til
  const teamRef = collection(firestore, teamId);
  const icebreakerRef = doc(teamRef, "icebreaker");
  const svarRef = collection(icebreakerRef, "svar");
  const personRef = doc(svarRef, svar.navn);

  try {
    setDoc(personRef, svar.personSvar);
  } catch (err) {
    console.log(err);
  }
};

export default handleIcebreakerSvar;
