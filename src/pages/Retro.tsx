import { useState } from "react";
import StepsRetro from "../components/StepsRetro";
import SkrivLapper from "../components/Retro/SkrivLapper";
import DiskuterLapper from "../components/Retro/DiskuterLapper";

const Retro = () => {
  /* "Mål siden sist",
    "Positive",  "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
    "Kategoriser",
    "Tiltak",
    "Mål framover",*/
  const steps = [
    "Hva gikk bra? - Skriv",
    "Hva gikk bra? - Diskuter",
    "Hva kunne gått bedre? - Skriv",
    "Hva kunne gått bedre? - Diskuter",
  ];

  const [nesteDisabled, setNesteDisabled] = useState<boolean>(false);
  const [oppdatertListe, setOppdatertListe] = useState<string[]>([]);

  const handleNesteDisabled = (disabled: boolean) => {
    setNesteDisabled(disabled);
  };

  const handleOppdatertListe = (liste: string[]) => {
    setOppdatertListe(liste);
  };

  const stepComponents = [
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift="Hva gikk bra? - Skriv"
      forklaring="Start tiden når alle er klare og skriv individuelt hva som har
      gått bra i denne sprinten. Legg til så mange lapper du ønsker."
      aktivitet="braLapper"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Hva gikk bra? -Diskuter"
      forklaring="Gå gjennom lappene og diskuter hva som gikk bra"
      filtrer={false}
      onOppdatertListe={handleOppdatertListe}
    />,
    <SkrivLapper
      onSkrivFerdig={handleNesteDisabled}
      overskrift={"Hva kunne gått bedre? - Skriv"}
      forklaring={
        "Start tiden når alle er klare og skriv individuelt ned hva som kunne gått bedre i denne sprinten. "
      }
      aktivitet="bedreLapper"
    />,
    <DiskuterLapper
      onDiskuterFerdig={handleNesteDisabled}
      overskrift="Hva kunne gått bedre? -Diskuter"
      forklaring="Gå gjennom lappene og diskuter hva som gikk bra"
      filtrer={true}
      onOppdatertListe={handleOppdatertListe}
    />,
  ];

  return (
    <div>
      <StepsRetro
        nameList={steps}
        content={stepComponents}
        nesteDisabled={nesteDisabled}
        oppdatertListe={oppdatertListe}
      />
    </div>
  );
};

export default Retro;
