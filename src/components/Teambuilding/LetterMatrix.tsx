import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import fasit from "../../images/letterMatrixFasit.png";

const LetterMatrix: React.FC = () => {
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
      "O",
      "S",
      "A",
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
      "O",
      "D",
      "E",
      "K",
      "A",
      "O",
      "P",
    ],
    [
      "I",
      "S",
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
      "R",
      "I",
      "S",
      "A",
      "S",
      "K",
    ],
    [
      "E",
      "K",
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
      "R",
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
      "L",
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
      "S",
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
      "R",
    ],
    [
      "I",
      "S",
      "A",
      "S",
      "K",
      "I",
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
      "T",
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
    <Box
      sx={{
        display: "flex",
        justifyContent: showFasit ? "space-between" : "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
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
                          width: "20px",
                          height: "20px",
                          border: "1px ",
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
        <Grid item>
          {showFasit && (
            <Box
              sx={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <img src={fasit}></img>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LetterMatrix;
