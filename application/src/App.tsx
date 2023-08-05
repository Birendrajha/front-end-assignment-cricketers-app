import React, { useState, useEffect } from "react";
import "./App.css";
import { PlayerListComp } from "./components";
import { usePlayersHooks } from "./customHooks";
import { TMayBe, TPlayer } from "./services";
import { Typography, Box } from "@mui/material";
function App() {
  const { players, getPlayers } = usePlayersHooks();
  const [playerList, setPlayerList] = useState<TPlayer[]>([]);
  const _getPlayers = async () => {
    const skip = 0;
    const playersList = await getPlayers(skip);
    if (playersList?.length > 0) {
      return playersList as TPlayer[];
    } else return [];
    //return Promise.resolve(playersList);
  };
  useEffect(() => {
    const getList = async () => {
      const data = await _getPlayers();
      setPlayerList([...data]);
    };
    getList();
  }, []);

  return (
    <Box className="App">
      <Typography variant="h1">
        {Boolean(playerList) ? playerList[0]?.name : "Birendra"}
        <PlayerListComp playerList={playerList} />
      </Typography>
    </Box>
  );
}

export default App;
