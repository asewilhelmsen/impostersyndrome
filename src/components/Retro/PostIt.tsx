import { Typography, Card, CardContent } from "@mui/material";

const PostIt = ({ tekst }: { tekst: string }) => {
  return (
    <Card style={{ backgroundColor: "#ffff99" }}>
      <CardContent>
        <Typography width={"100%"} textAlign={"center"} variant="body1">
          {tekst}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostIt;
