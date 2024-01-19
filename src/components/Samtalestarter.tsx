import {
  Typography,
  Button,
  Card,
  Box,
  CardContent,
  CardActions,
} from "@mui/material";

const Samtalestarter = () => {
  const samtalekortArray = [
    "Hvordan tror dere teamarbeid påvirker følelsen av imposter syndrome?",
    "Hva kan dere gjøre for å miske imposter følelsene på teamet?",
  ];

  let index = 0;

  return (
    <>
      <Typography variant="h2" sx={{ mt: 5 }} color="text.primary">
        Samtalestarter{" "}
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }} color="text.secondary">
        La oss snakke om hvordan dere kan jobbe bra som et team!{" "}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "50%", heigh: "100px" }}>
          <CardContent>
            <Typography variant="h5">{samtalekortArray[index]}</Typography>
          </CardContent>
          <CardActions>
            <Button>Neste</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default Samtalestarter;
