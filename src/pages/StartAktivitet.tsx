import Steps from "../components/Steps";
import Icebreaker from "../components/Icebreaker/Icebreaker";
import Forventninger from "../components/StartAktivitet/Forventninger";
import IPInformasjon from "../components/StartAktivitet/IPInformasjon";
import Samtalestarter from "../components/StartAktivitet/Samtalestarter";
import { useState } from "react";

const StartAktivitet = () => {
  const steps = [
    "Icebreaker",
    "Lær mer om Imposter Phenomenon",
    "Samtalestarter",
    "Forventningsavklaringer",
  ];
  const [maal, setMaal] = useState<{ [key: string]: string }>({});

  // Callback funksjon for å håndtere måldata som blir satt på tvers av komponenter
  const handleMaalSubmit = (maal: { [key: string]: string }) => {
    setMaal(maal);
  };

  const stepComponents = [
    <Icebreaker />,
    <IPInformasjon />,
    <Samtalestarter />,
    <Forventninger onMaalSubmit={handleMaalSubmit} />,
  ];

  return (
    <div>
      <Steps nameList={steps} content={stepComponents} maalData={maal} />
    </div>
  );
};

export default StartAktivitet;
