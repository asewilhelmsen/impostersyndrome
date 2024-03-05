import { Typography, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useTeamContext } from "../../TeamContext";
import handleLeggTilRetroSvar from "../../firebase/handles/handleLeggTilRetroSvar";
import PositivTenkingStatistikk from "./PositivTenkingStatistikk";

const PositivTenking = ({
  onSendInn,
}: {
  onSendInn: (disabled: boolean) => void;
}) => {
  const { teamBruker, retroNummer } = useTeamContext();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    onSendInn(true);
  }, []);

  useEffect(() => {
    //fetch statistics
  }, [showStatistics]);

  const affirmations: string[] = [
    "Vi kommuniserer godt",
    "Vi støtter og oppmuntrer hverandre",
    "Alle meninger blir hørt",
    "Vi er åpne for konstruktiv tilbakemelding",
    "Vi er gode til å stille spørsmål",
    "Gjennom godt samarbeid overvinner vi utfordringer",
    "Vi søker mot å skape et miljø med tillit",
    "Vi er flinke til å gi hverandre komplimenter for arbeidet",
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
    handleLeggTilRetroSvar(retroNummer, selectedCards, "positivTenking");
    setShowStatistics(true);
    onSendInn(false);
  };

  return (
    <>
      <Typography variant="h2">Positiv tenking</Typography>
      {!showStatistics && (
        <Typography marginLeft={"5px"} variant="body1">
          Velg individuelt inntil 3 kort som motiverer deg til å prestere i et
          team.
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
      {showStatistics && <PositivTenkingStatistikk></PositivTenkingStatistikk>}
    </>
  );
};

export default PositivTenking;
