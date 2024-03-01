import { Typography, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useTeamContext } from "../../TeamContext";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";

const PositivTenking = () => {
  const { teamBruker } = useTeamContext();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    //fetch statistics
  }, [showStatistics]);

  const cardNames: string[] = [];
  for (let i = 1; i <= 12; i++) {
    cardNames.push(`Positiv tenking tekst ${i}`);
  }

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
    setShowStatistics(true);
  };

  return (
    <>
      <Typography variant="h2">Positiv tenking</Typography>
      <Typography marginLeft={"5px"} variant="body1">
        Velg individuelt opptil 3 kort som du mener teamet har vært flinke på
        frem til nå.
      </Typography>
      {!showStatistics && (
        <div
          style={{
            width: "100%",
            marginTop: "1%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            {cardNames.map((cardName, index) => (
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
        <div>
          <Typography variant="h3">Statistics:</Typography>
        </div>
      )}
    </>
  );
};

export default PositivTenking;
