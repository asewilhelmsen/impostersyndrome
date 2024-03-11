import { Typography, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useTeamContext } from "../../TeamContext";
import PositivTenkingStatistikk from "./PositivTenkingStatistikk";
import handleLeggTilObjekt from "../../firebase/handles/handleLeggTilObjekt";

const PositivTenking = ({
  onSendInn,
  leggTilPA,
}: {
  onSendInn: (disabled: boolean) => void;
  leggTilPA: (tekst: string) => void;
}) => {
  const { retroNummer } = useTeamContext();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    onSendInn(true);
  }, []);

  const affirmations: string[] = [
    "Sammen har vi mye kunnskap",
    "I dag er vi positive og engasjerte",
    "Vi alle bringer verdi til teamet",
    "Gode team holder ingen tilbake",
    "Vårt team har integritet og lidenskap",
    "Vi gir hverandre styrke til å lykkes",
    "Vi aksepterer utfordringer som muligheter",
    "Vi verdsetter og respekterer alles meninger",
  ];

  const handleCardClick = (cardName: string) => {
    if (selectedCards.includes(cardName)) {
      setSelectedCards(selectedCards.filter((card) => card !== cardName));
    } else {
      if (selectedCards.length < 3) {
        setSelectedCards([...selectedCards, cardName]);
      }
    }
  };

  const handleSendInn = async () => {
    handleLeggTilObjekt(retroNummer, selectedCards, "positivTenking");
    setShowStatistics(true);
    onSendInn(false);
  };

  return (
    <>
      <Typography variant="h2" marginBottom={"10px"}>
        Styrke selvtillit og motivasjon
      </Typography>
      {!showStatistics && (
        <Typography marginLeft={"5px"} variant="body1">
          Velg individuelt opptil 3 kort som du tror vil være inspirerende for
          deg og teamet ditt i prosjektarbeidet.
        </Typography>
      )}
      {!showStatistics && (
        <div
          style={{
            width: "100%",
            marginTop: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {affirmations.map((cardName, index) => (
              <Grid
                item
                xs={3}
                key={index}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  style={{
                    borderRadius: "2px",
                    padding: "16px",
                    width: "300px",
                    height: "80px",
                    borderWidth: "2px",
                    borderColor: selectedCards.includes(cardName)
                      ? "#7D97F4"
                      : undefined,
                  }}
                  variant="outlined"
                  onClick={() => handleCardClick(cardName)}
                  disabled={
                    selectedCards.length === 3 &&
                    !selectedCards.includes(cardName)
                  }
                >
                  {cardName}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={handleSendInn}
            style={{ marginTop: "2%" }}
          >
            Send inn
          </Button>
        </div>
      )}
      {showStatistics && (
        <>
          <Typography marginLeft={"5px"} variant="body1">
            Når alle har svart vil kortet med flest stemmer vises under.
          </Typography>
          <PositivTenkingStatistikk leggTilPA={leggTilPA} />
        </>
      )}
    </>
  );
};

export default PositivTenking;
