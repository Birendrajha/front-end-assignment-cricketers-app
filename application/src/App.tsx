import React, { useState, useEffect } from "react";
import "./App.css";
import { PlayerListComp, HeaderComp } from "./components";
import { usePlayersHooks } from "./customHooks";
import { TMayBe, TPlayer } from "./services";
import { Typography, Box } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const {
    playerList,
    getPlayers,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    _getFilteredPlayersList,
    resetFilter,
  } = usePlayersHooks();

  console.log(playerList);
  return (
    <Box className="App" height="100vh">
      <HeaderComp
        onChangeSearchText={onChangeSearchText}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        getFilteredPlayersList={_getFilteredPlayersList}
        resetFilter={resetFilter}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayerListComp playerList={playerList} />}>
            {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
