import { useState } from "react";
import GikkBraSkriv from "../components/Retro/GikkBraSkriv";
import StepsRetro from "../components/StepsRetro";
import GikkBraDiskuter from "../components/Retro/GikkBraDiskuter";

const Retro = () => {
  /* "Mål siden sist",
    "Positive",  "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
    "Kategoriser",
    "Tiltak",
    "Mål framover",*/
  const steps = ["Hva gikk bra? - Skriv", "Hva gikk bra? - Diskuter"];

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);
  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const stepComponents = [
    <GikkBraSkriv onBraSkrivFerdig={handleNesteDisabled} />,
    <GikkBraDiskuter onBraSkrivFerdig={handleNesteDisabled} />,
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
