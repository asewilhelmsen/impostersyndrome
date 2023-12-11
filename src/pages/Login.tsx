import Test from "../components/Test";
import { FormEvent, useEffect, useRef, useState } from "react";
import handleSubmit from "../firebase/handles/handleSubmit";
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase/firebase_setup/firebase";

interface Teams {
  id: string;
  // other fields...
}
const Login = () => {
  //Test for å skrive til database
  const dataRef = useRef<HTMLInputElement>(null);

  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    if (dataRef.current) {
      handleSubmit(dataRef.current.value);
      dataRef.current.value = "";
    }
  };

  //Test for å lese fra database
  const [data, setData] = useState<Teams[]>([]);

  useEffect(() => {
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
  );
};

export default Login;
