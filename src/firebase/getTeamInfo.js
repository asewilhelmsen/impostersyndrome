import { auth, firestore } from "./firebase_setup/firebase";
import { collection, getDocs } from "@firebase/firestore";

const getTeamInfo = async () => {
  //For å hente hvilket team brukeren er logget inn på
  const userId = auth.currentUser.uid;

  try {
    const collectionName = "teamInfo_" + userId;

    const querySnapshot = await getDocs(collection(firestore, collectionName));

    const newData = [];
    console.log("query", querySnapshot);
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
    });
    console.log("new data", newData);

    return newData;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export default getTeamInfo;
