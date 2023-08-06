import React, { useState, useEffect } from "react";
import "./App.css";
import { PlayerListComp, HeaderComp } from "./components";
import { usePlayersHooks } from "./customHooks";
import { TMayBe, TPlayer } from "./services";
import { Typography, Box } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerDetails } from "./components/playerDetailComp";
import { useNavigate } from "react-router-dom";
function App() {
  const {
    playerList,
    getPlayers,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    _getFilteredPlayersList,
    resetFilter,
    selectedPlayer,
    setSelectedPlayer,
  } = usePlayersHooks();

  console.log(playerList);
  const navigate = useNavigate();
  const onNavigate = (p: TPlayer) => {
    setSelectedPlayer(p);
    navigate("/playerDetails");
  };

  const onNavigateBack = () => {
    setSelectedPlayer(undefined);
    navigate("/");
  };
  return (
    <Box className="App" height="100vh">
      <HeaderComp
        onChangeSearchText={onChangeSearchText}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        getFilteredPlayersList={_getFilteredPlayersList}
        resetFilter={resetFilter}
      />
      {/* <BrowserRouter> */}
      <Routes>
        <Route
          path="/"
          element={
            <PlayerListComp playerList={playerList} onNavigate={onNavigate} />
          }
        ></Route>
        <Route
          path="/playerDetails"
          element={
            <PlayerDetails
              player={selectedPlayer}
              onNavigateBack={onNavigateBack}
            />
          }
        ></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </Box>
  );
}

export default App;
