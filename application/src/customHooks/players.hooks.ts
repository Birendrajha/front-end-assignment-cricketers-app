import { useEffect, useState } from "react";
import { TPlayer, TMayBe, players } from "../services";
import { Filter } from "../components/headerComp";

export const usePlayersHooks = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>(Filter.All);
  const [playerList, setPlayerList] = useState<TPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<TPlayer>();
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

  const _getFilteredPlayersList = (filterBy?: Filter) => {
    console.log(selectedFilter);
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

  return {
    playerList,
    getPlayers,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    _getFilteredPlayersList,
    resetFilter,
    selectedPlayer,
    setSelectedPlayer,
  };
};
