import React, { useEffect } from "react";
import "./App.css";
import { PlayerListComp, HeaderComp } from "./components";
import { usePlayersHooks } from "./customHooks";
import { TMayBe, TPlayer } from "./services";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { PlayerDetails } from "./components/playerDetailComp";
import { useNavigate } from "react-router-dom";
function App() {
  const {
    playerList,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    resetFilter,
    selectedPlayer,
    setSelectedPlayer,
    similarPlayer,
    getAge,
    selectedSortBy,
    setSelectedSortBy,
    resetSortBy,
    moreItemAvailable,
    fetchMoreItem,
    setSkip,
    skip,
  } = usePlayersHooks();

  const navigate = useNavigate();
  const onNavigate = (p: TPlayer) => {
    setSelectedPlayer(p);
    navigate("/playerDetails");
  };
  useEffect(() => {
    onNavigateBack();
  }, []);
  const onNavigateBack = () => {
    setSelectedPlayer(undefined);
    navigate("/");
  };
  return (
    <Box className="App">
      <HeaderComp
        onChangeSearchText={onChangeSearchText}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        resetFilter={resetFilter}
        selectedSortBy={selectedSortBy}
        setSelectedSortBy={setSelectedSortBy}
        resetSortBy={resetSortBy}
      />
      {/* <BrowserRouter> */}
      <Routes>
        <Route
          path="/"
          element={
            <PlayerListComp
              setSkip={setSkip}
              skip={skip}
              playerList={playerList}
              onNavigate={onNavigate}
              getAge={getAge}
              moreItemAvailable={moreItemAvailable}
              fetchMoreItem={fetchMoreItem}
              selectedSortBy={selectedSortBy}
            />
          }
        ></Route>
        <Route
          path="/playerDetails"
          element={
            <PlayerDetails
              getAge={getAge}
              onNavigate={onNavigate}
              player={selectedPlayer}
              onNavigateBack={onNavigateBack}
              similarPlayer={similarPlayer}
            />
          }
        ></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </Box>
  );
}

export default App;
