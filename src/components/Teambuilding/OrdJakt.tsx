import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import fasit from "../../images/ordJaktFasit.png";

const OrdJakt = ({
  onLukk,
  onFullfor,
}: {
  onLukk: () => void;
  onFullfor: () => void;
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");
  const handleBackToHomePage = () => {
    onLukk();
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(
      (cell: any) => cell[0] === row && cell[1] === col
    );
  };

  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [showFasit, setShowFasit] = useState<boolean>(false);

  const matrix: string[][] = [
    [
      "T",
      "I",
      "D",
      "S",
      "T",
      "N",
      "A",
      "R",
      "R",
      "A",
      "Y",
      "I",
      "S",
      "F",
      "S",
      "S",
      "I",
      "S",
      "P",
      "M",
    ],
    [
      "G",
      "V",
      "U",
      "A",
      "L",
      "B",
      "P",
      "U",
      "A",
      "Å",
      "J",
      "Y",
      "Q",
      "O",
      "F",
      "B",
      "E",
      "T",
      "O",
      "C",
    ],
    [
      "K",
      "A",
      "F",
      "F",
      "E",
      "E",
      "L",
      "S",
      "O",
      "F",
      "A",
      "D",
      "T",
      "E",
      "Å",
      "P",
      "E",
      "N",
      "H",
      "E",
    ],
    [
      "R",
      "D",
      "I",
      "A",
      "N",
      "A",
      "T",
      "I",
      "S",
      "M",
      "S",
      "D",
      "T",
      "K",
      "D",
      "E",
      "K",
      "A",
      "O",
      "P",
    ],
    [
      "Q",
      "L",
      "R",
      "L",
      "D",
      "T",
      "I",
      "T",
      "I",
      "J",
      "A",
      "V",
      "A",
      "A",
      "O",
      "E",
      "K",
      "A",
      "T",
      "I",
    ],
    [
      "R",
      "E",
      "M",
      "F",
      "N",
      "E",
      "J",
      "G",
      "N",
      "N",
      "A",
      "N",
      "D",
      "T",
      "R",
      "B",
      "D",
      "I",
      "A",
      "O",
    ],
    [
      "D",
      "S",
      "M",
      "S",
      "I",
      "A",
      "K",
      "J",
      "T",
      "E",
      "R",
      "V",
      "E",
      "A",
      "K",
      "I",
      "S",
      "A",
      "S",
      "K",
    ],
    [
      "K",
      "E",
      "A",
      "O",
      "N",
      "M",
      "T",
      "D",
      "T",
      "D",
      "K",
      "O",
      "O",
      "K",
      "S",
      "A",
      "E",
      "K",
      "T",
      "M",
    ],
    [
      "B",
      "D",
      "L",
      "A",
      "G",
      "G",
      "N",
      "S",
      "O",
      "F",
      "O",
      "K",
      "S",
      "S",
      "L",
      "M",
      "Å",
      "I",
      "N",
      "O",
    ],
    [
      "R",
      "G",
      "F",
      "I",
      "R",
      "D",
      "S",
      "T",
      "I",
      "L",
      "R",
      "K",
      "A",
      "K",
      "K",
      "A",
      "K",
      "K",
      "J",
      "E",
    ],
    [
      "A",
      "K",
      "K",
      "J",
      "E",
      "N",
      "N",
      "R",
      "S",
      "I",
      "S",
      "J",
      "O",
      "B",
      "B",
      "R",
      "E",
      "M",
      "F",
      "N",
    ],
    [
      "E",
      "N",
      "S",
      "O",
      "F",
      "A",
      "T",
      "F",
      "S",
      "N",
      "I",
      "S",
      "A",
      "I",
      "K",
      "D",
      "S",
      "M",
      "S",
      "I",
    ],
    [
      "B",
      "D",
      "I",
      "A",
      "O",
      "M",
      "J",
      "P",
      "Å",
      "P",
      "E",
      "N",
      "H",
      "E",
      "T",
      "R",
      "N",
      "A",
      "A",
      "G",
    ],
    [
      "I",
      "S",
      "A",
      "S",
      "K",
      "Ø",
      "K",
      "S",
      "T",
      "D",
      "T",
      "E",
      "O",
      "K",
      "F",
      "E",
      "E",
      "K",
      "S",
      "O",
    ],
    [
      "R",
      "E",
      "M",
      "F",
      "N",
      "E",
      "J",
      "G",
      "N",
      "N",
      "A",
      "N",
      "D",
      "T",
      "R",
      "B",
      "D",
      "I",
      "A",
      "O",
    ],
    [
      "B",
      "D",
      "L",
      "R",
      "G",
      "Ø",
      "Y",
      "S",
      "O",
      "F",
      "O",
      "K",
      "L",
      "S",
      "L",
      "M",
      "L",
      "I",
      "Ø",
      "L",
    ],
  ];

  const handleCellSelect = (row: number, col: number) => {
    // Logic to handle cell selection and updating selectedCells state
    const cellIndex = selectedCells.findIndex(
      ([selectedRow, selectedCol]) => selectedRow === row && selectedCol === col
    );
    if (cellIndex === -1) {
      // Cell not selected, add it to the selectedCells array
      setSelectedCells((prevSelectedCells) => [
        ...prevSelectedCells,
        [row, col],
      ]);
    } else {
      // Cell already selected, remove it from the selectedCells array
      setSelectedCells((prevSelectedCells) => {
        const newSelectedCells = [...prevSelectedCells];
        newSelectedCells.splice(cellIndex, 1);
        return newSelectedCells;
      });
    }
  };

  const checkAnswers = () => {
    setShowFasit(!showFasit);
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <Grid
          container
          sx={{ alignItems: "center", marginTop: "2%", marginBottom: "2%" }}
        >
          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{ marginBottom: "1%", marginLeft: "5%" }}
            >
              Ord-jakten
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "right", paddingRight: "2%" }}>
            <Button variant="contained" onClick={handleBackToHomePage}>
              Tilbake
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            flex: 1,
            backgroundColor: "#E3EAFD",
            display: "flex",
            flexDirection: "column",
            paddingTop: "2%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Typography
            marginLeft={"5px"}
            variant="body1"
            sx={{ marginBottom: "20px" }}
          >
            Samarbeid og finn så mange ord dere klarer! Klikk på bokstavene for
            å markere ordene dere finner. Ord kan finnes både horisontalt,
            vertikalt og diagonalt.
          </Typography>

          <Grid
            container
            spacing={1}
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid item xs={5}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              >
                <table>
                  <tbody>
                    {matrix.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((letter, colIndex) => (
                          <td
                            key={colIndex}
                            onClick={() => handleCellSelect(rowIndex, colIndex)}
                            style={{
                              color: isCellSelected(rowIndex, colIndex)
                                ? "#7D97F4"
                                : "",
                              textAlign: "center",
                              verticalAlign: "middle",
                              width: "18px",
                              height: "18px",
                              padding: "2px",
                              outline: isCellSelected(rowIndex, colIndex)
                                ? "0.5px solid grey"
                                : "",
                              borderRadius: "5px",
                            }}
                          >
                            {letter}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
              <Button onClick={checkAnswers}>
                {!showFasit ? "Sjekk fasit" : "Skjul fasit"}
              </Button>
            </Grid>
            {showFasit && (
              <Grid item xs={5} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <img src={fasit} style={{ width: "100%" }}></img>
                </Box>
                <Typography variant="body2">
                  Fant dere noen ord som ikke var i fasiten? Bra jobba!
                </Typography>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{
                width: "140px",
                marginTop: "10px",
              }}
              onClick={onFullfor}
            >
              Øvelse ferdig
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default OrdJakt;
