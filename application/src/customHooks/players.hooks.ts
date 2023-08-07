import { useEffect, useState } from "react";
import { TPlayer, TMayBe, players } from "../services";
import { Filter, SortBy } from "../components/headerComp";

export const usePlayersHooks = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedSortBy, setSelectedSortBy] = useState<string>(SortBy.Rank);
  const [selectedFilter, setSelectedFilter] = useState<string>(Filter.All);
  const [playerList, setPlayerList] = useState<TPlayer[]>(players as TPlayer[]);
  const [selectedPlayer, setSelectedPlayer] = useState<TPlayer>();
  const [similarPlayer, setSimilarPlayer] = useState<TPlayer[]>();
  const onChangeSearchText = (seartcText: string) => {
    setSearchText(seartcText);
  };

  const getPlayers = (skip: number): Promise<TPlayer[]> => {
    return Promise.resolve<TPlayer[]>(
      (players as TPlayer[])
        .sort((a, b) => {
          const aPoints = a.points ?? 0;
          const bPoints = b.points ?? 0;

          return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
        })
        .map((it, index) => ({
          ...it,
          rank: index + 1,
        }))
        .slice(skip, skip + 10)
    );
  };
  const _getPlayers = async () => {
    const skip = 0;
    const playersList = await getPlayers(skip);
    if (playersList?.length > 0) {
      setPlayerList([...playersList]);
    }
  };

  const getSimilarPlayer = async () => {
    const skip = 0;
    const playersList = await getPlayers(skip);
    if (playersList?.length > 0) {
      const similarPlayer = playerList?.filter(
        (player) => player.type === selectedPlayer?.type
      );
      setSimilarPlayer(similarPlayer);
    }
  };
  useEffect(() => {
    if (Boolean(selectedPlayer)) {
      getSimilarPlayer();
    }
  }, [selectedPlayer]);
  const _getPlayersBySearchName = (searchText: string): Promise<TPlayer[]> => {
    return Promise.resolve<TPlayer[]>(
      (players as TPlayer[])
        ?.filter((player) => player.name?.includes(searchText))
        .sort((a, b) => {
          const aPoints = a.points ?? 0;
          const bPoints = b.points ?? 0;

          return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
        })
        .map((it, index) => ({
          ...it,
          rank: index + 1,
        }))
      //.slice(0, skip + 10)
    );
  };

  const getFilteredPlayersList = (filterBy?: Filter) => {
    if (selectedFilter !== Filter.All) {
      const data = (players as TPlayer[])
        ?.filter((player) => player.name?.includes(searchText))
        ?.filter((player) => player.type === selectedFilter)
        .sort((a, b) => {
          const aPoints = a.points ?? 0;
          const bPoints = b.points ?? 0;

          return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
        })
        .map((it, index) => ({
          ...it,
          rank: index + 1,
        }));
      setPlayerList([...data]);
    } else {
      _getPlayers();
    }
  };
  const resetFilter = () => {
    setSelectedFilter(Filter.All);
    _getPlayers();
  };

  useEffect(() => {
    if (!Boolean(searchText)) {
      _getPlayers();
    } else if (Boolean(searchText)) {
      _getPlayersBySearchName(searchText)?.then((data) => {
        console.log(data);
        setPlayerList([...data]);
      });
    }
  }, [searchText]);

  const getAge = (dob: any) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getSortedList = () => {
    if (selectedSortBy === SortBy.Rank) {
      const data = (players as TPlayer[])
        .sort((a, b) => {
          const aPoints = a.points ?? 0;
          const bPoints = b.points ?? 0;

          return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
        })
        .map((it, index) => ({
          ...it,
          rank: index + 1,
        }));
      setPlayerList([...data]);
    } else if (selectedSortBy === SortBy.Age) {
      const data = (players as TPlayer[])
        .sort((a, b) => {
          const aPoints = a.points ?? 0;
          const bPoints = b.points ?? 0;

          return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
        })
        .map((it, index) => ({
          ...it,
          rank: index + 1,
        }))
        .sort((a, b) => {
          const aAge = a.dob ?? 0;
          const bAge = b.dob ?? 0;
          return aAge === bAge ? 0 : bAge ?? 0 < aAge ?? 0 ? 1 : -1;
        });
      setPlayerList([...data]);
    } else {
      _getPlayers();
    }
  };

  const resetSortBy = () => {
    setSelectedSortBy(SortBy.Rank);
    _getPlayers();
  };

  return {
    playerList,
    getPlayers,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    getFilteredPlayersList,
    resetFilter,
    selectedPlayer,
    setSelectedPlayer,
    getSimilarPlayer,
    similarPlayer,
    getAge,
    selectedSortBy,
    setSelectedSortBy,
    resetSortBy,
    getSortedList,
  };
};
