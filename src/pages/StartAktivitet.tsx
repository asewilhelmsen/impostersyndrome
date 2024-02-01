import Steps from "../components/Steps";
import Icebreaker from "../components/Icebreaker/Icebreaker";
import Forventninger from "../components/StartAktivitet/Forventninger";
import IPInformasjon from "../components/StartAktivitet/IPInformasjon";
import Samtalestarter from "../components/StartAktivitet/Samtalestarter";
import { useState } from "react";
import { Maalene } from "../interfaces";

const StartAktivitet = () => {
  const steps = [
    "Icebreaker",
    "Informasjon",
    "Samtalestarter",
    "Forventningsavklaring",
  ];
  const [maal, setMaal] = useState<Maalene[]>([]);

  // Callback funksjon for å håndtere måldata som blir satt på tvers av komponenter
  const handleMaalSubmit = (maalList: Maalene[]) => {
    setMaal(maalList);
  };

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);

  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };
  const stepComponents = [
    <Icebreaker onIcebreakerFerdig={handleNesteDisabled} />,
    <IPInformasjon onIPinfo={handleNesteDisabled} />,
    <Samtalestarter onSamtaleFerdig={handleNesteDisabled} />,
    <Forventninger
      onMaalSubmit={handleMaalSubmit}
      onForventningerFerdig={handleNesteDisabled}
    />,
  ];

  return (
    <div>
      <Steps
        nameList={steps}
        content={stepComponents}
        maalData={maal}
        nesteDisabled={nesteDisabled}
      />
    </div>
  );
};

export default StartAktivitet;
