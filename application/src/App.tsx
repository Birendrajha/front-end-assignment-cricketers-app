import React, { useEffect } from "react";
import "./App.css";
import { HeaderComp } from "./components";
import { usePlayersHooks } from "./customHooks";
import { TMayBe, TPlayer } from "./services";
import { Box, CircularProgress } from "@mui/material";
import { Routes, Route } from "react-router-dom";
//import { PlayerDetails } from "./components/playerDetailComp";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const PlayerListComp = lazy(() => {
  return Promise.all([
    import("./components/playersListComp"),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]).then(([moduleExports]) => moduleExports);
});

const PlayerDetails = lazy(() => {
  return Promise.all([
    import("./components/playerDetailComp"),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]).then(([moduleExports]) => moduleExports);
});
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
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderComp
          onChangeSearchText={onChangeSearchText}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          resetFilter={resetFilter}
          selectedSortBy={selectedSortBy}
          setSelectedSortBy={setSelectedSortBy}
          resetSortBy={resetSortBy}
        />
      </Suspense>
      {/* <BrowserRouter> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <Box>
                  <CircularProgress />
                </Box>
              }
            >
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
            </Suspense>
          }
        ></Route>
        <Route
          path="/playerDetails"
          element={
            <Suspense
              fallback={
                <Box>
                  <CircularProgress />
                </Box>
              }
            >
              <PlayerDetails
                getAge={getAge}
                onNavigate={onNavigate}
                player={selectedPlayer}
                onNavigateBack={onNavigateBack}
                similarPlayer={similarPlayer}
              />
            </Suspense>
          }
        ></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </Box>
  );
}

export default App;
