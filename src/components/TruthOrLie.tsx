import { Typography } from "@mui/material";
import { useEffect } from "react";

const TruthOrLie = ({ message }: { message: string }) => {
  useEffect(() => {
    const fetchData = async () => {
      //const submissions = await getTruthLie();
      // setData(submissions);
    };

    fetchData();
  }, []);
  return <Typography variant="h2">{message}</Typography>;
};

export default TruthOrLie;
