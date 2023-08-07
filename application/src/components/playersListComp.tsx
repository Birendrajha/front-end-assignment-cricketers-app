import React, { useState, useEffect } from "react";
import { usePlayersHooks } from "../customHooks";
import { TMayBe, TPlayer } from "../services";
import { Typography, Box, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export const PlayerListComp = ({
  playerList,
  onNavigate,
  getAge,
}: {
  playerList: TPlayer[];
  onNavigate: (selectedPlayer: TPlayer) => void;
  getAge: (dob: any) => number;
}) => {
  const createData = (player: TPlayer) => {
    return player;
  };

  const tableColoumns = ["", "Name", "Type", "Points", "Rank", "Age", "Action"];

  const rows = playerList?.map((p) => createData(p));

  return (
    <Box>
      <Box display="flex" padding={2} height={550}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableColoumns?.map((coulmn, id) =>
                  Boolean(coulmn) ? (
                    <TableCell align="left">
                      <Typography variant="h6">{coulmn}</Typography>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      <Avatar src="https://media.istockphoto.com/id/519611160/vector/flag-of-india.jpg?s=170667a&w=0&k=20&c=OXKzCr54bPxtbVFf_rI2-1Mtpi9f1VOCuGcb10v20rU=" />
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Avatar src={row.profilePic} alt="pic" />
                  </TableCell>

                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">{row.rank}</TableCell>
                  <TableCell align="left">{getAge(row.dob)}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        onNavigate(row);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
