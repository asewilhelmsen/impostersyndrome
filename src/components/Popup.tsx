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
            Title
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            More info
          </Typography>
          <Typography variant="body2">
            Some text. Add this by proping it fex
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
