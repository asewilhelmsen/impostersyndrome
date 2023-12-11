import Test from "../components/Test";
import { FormEvent, useRef } from "react";
import handleSubmit from "../firebase/handles/handleSubmit";

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
  return (
    <>
      <div>Start siden med join team knapp</div>
      <Test message="Dette er en test" />
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Login;
