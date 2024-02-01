import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Popup = ({
  overskrift,
  tekst,
}: {
  overskrift: string;
  tekst: string;
}) => {
  return (
    <Card
      sx={{
        width: "60%",
        minHeight: 200,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        position: "relative",
      }}
    >
      <Tooltip title="Følg med her for spennende aktiviteter, informasjon og utfordringer på tilfeldige tidspunkter!">
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <CardContent>
        <Typography style={{ marginBottom: "10%" }} variant="h5">
          {overskrift}
        </Typography>

        <Typography variant="body1">{tekst}</Typography>
      </CardContent>
    </Card>
  );
};

export default Popup;
