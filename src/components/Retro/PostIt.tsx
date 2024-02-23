import { Typography, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PostIt = ({
  tekst,
  onDelete,
}: {
  tekst: string;
  onDelete?: () => void;
}) => {
  return (
    <Card
      style={{
        backgroundColor: "#ffff99",
        height: "100px",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography width={"100%"} textAlign={"center"} variant="body1">
          {tekst}
        </Typography>
        {onDelete && (
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={onDelete}
          >
            <CloseIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default PostIt;
