import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Popup = () => {
  return (
    <>
      <Card sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Learn more about Imposter Syndrome?
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            Are you curious about learning more about Impostor Syndrome?
            Understanding Impostor Syndrome can be a key step in overcoming it.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Popup;
