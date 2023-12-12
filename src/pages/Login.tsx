import Test from "../components/Test";
import { FormEvent, useEffect, useRef, useState } from "react";
import handleSubmit from "../firebase/handles/handleSubmit";
import { collection, getDocs } from "@firebase/firestore";
import { auth, firestore } from "../firebase/firebase_setup/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

interface Teams {
  id: string;
  // other fields...
}
const Login = () => {
  //Test for å skrive til database
  const dataRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(auth.currentUser);

  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    if (dataRef.current) {
      handleSubmit(dataRef.current.value);
      dataRef.current.value = "";
    }
  };

  //Test for å lage bruker
  const signUp = async () => {
    try {
      const email = "user@example.com"; // replace with actual user credentials
      const password = "password123"; // replace with actual user credentials

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  //Test for å logge inn
  const signIn = async () => {
    try {
      const email = "user@example.com"; // replace with actual user credentials
      const password = "password123"; // replace with actual user credentials

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  //Test for å logge ut
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //For å lytte til når bruker blir satt
  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //Test for å lese fra database
  const [data, setData] = useState<Teams[]>([]);

  useEffect(() => {
    console.log("henter data");
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "teams"));

      const newData: Teams[] = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() } as Teams);
      });

      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Start siden med join team knapp</div>
      <Test message="Dette er en test" />
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <form onSubmit={submithandler}>
            <input type="text" ref={dataRef} />
            <button type="submit">Save</button>
          </form>
          <div>
            <h2>Data from Firestore:</h2>
            <ul>
              {data.map((item: Teams) => (
                <li key={item.id}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
        </>
      )}
    </>
  );
};

export default Login;
