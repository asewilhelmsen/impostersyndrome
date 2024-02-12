import { useState } from "react";
import GikkBraSkriv from "../components/Retro/GikkBraSkriv";
import StepsRetro from "../components/StepsRetro";

const Retro = () => {
  const steps = [
    /* "Mål siden sist",
    "Positive",*/
    "Hva gikk bra? - Skriv" /*
    Hva gikk bra? - Diskuter",
    "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
    "Kategoriser",
    "Tiltak",
    "Mål framover",*/,
  ];

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);
  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const stepComponents = [
    <GikkBraSkriv onBraSkrivFerdig={handleNesteDisabled} />,
  ];

  return (
    <div>
      <StepsRetro
        nameList={steps}
        content={stepComponents}
        nesteDisabled={nesteDisabled}
      />
    </div>
  );
};

export default Retro;
