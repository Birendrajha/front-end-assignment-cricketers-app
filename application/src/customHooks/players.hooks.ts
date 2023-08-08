import { useEffect, useMemo, useState } from "react";
import { TPlayer, players } from "../services";
import { Filter, SortBy } from "../components/headerComp";
import debounce from "lodash.debounce";

export type FinalPList = {
  pList: TPlayer[];
  count: number;
};
export const usePlayersHooks = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedSortBy, setSelectedSortBy] = useState<string>(SortBy.Rank);
  const [selectedFilter, setSelectedFilter] = useState<string>(Filter.All);
  const [playerList, setPlayerList] = useState<TPlayer[]>([]); //(players as TPlayer[]);
  const [selectedPlayer, setSelectedPlayer] = useState<TPlayer>();
  const [similarPlayer, setSimilarPlayer] = useState<TPlayer[]>();
  const [moreItemAvailable, setMoreItemAvailable] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);

  const onChangeSearchText = (seartcText: string) => {
    setSearchText(seartcText);
  };

  const debouncedResults = useMemo(() => {
    return debounce(onChangeSearchText, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    if (Boolean(selectedPlayer)) {
      getSimilarPlayer();
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (skip >= 10) {
      fetchMoreItem();
    }
  }, [skip]);

  const getPlayers = (): Promise<TPlayer[]> => {
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
      //.slice(skip, skip + 10)
    );
  };
  //To  get 5  similar  player based on selected player
  const getSimilarPlayer = async () => {
    const playersList = await getPlayers();
    if (playersList?.length > 0) {
      const similarPlayer = playerList?.filter(
        (player) => player.type === selectedPlayer?.type
      );
      setSimilarPlayer(similarPlayer);
    }
  };
  //To reset Filter Menu
  const resetFilter = () => {
    setSelectedFilter(Filter.All);
  };
  // To get Age from dob
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
  //Reset sort By Menu
  const resetSortBy = () => {
    setSelectedSortBy(SortBy.Rank);
  };

  const fetchMoreItem = async () => {
    const _playerList = await getFinalPlayerList();
    setPlayerList([
      ...playerList,
      ..._playerList?.pList?.slice(skip, skip + 10),
    ]);
    if (playerList?.length + _playerList?.pList?.length >= _playerList.count) {
      setMoreItemAvailable(false);
    }
  };

  // 1st priority to filter Player based on searchText
  const _getSearchedPlayerList = (pList: TPlayer[]): Promise<TPlayer[]> => {
    if (Boolean(searchText)) {
      let regex = new RegExp(searchText, "i");
      return Promise.resolve<TPlayer[]>(
        pList?.filter(
          (_p) => regex.test(_p?.name ?? "") //_p?.name?.indexOf(searchText) === 0)
        )
      );
    } else {
      return Promise.resolve<TPlayer[]>(pList);
    }
  };

  //  2nd priority to filter Player based on selected filter
  const _getFilteredPlayerList = (pList: TPlayer[]): Promise<TPlayer[]> => {
    if (selectedFilter === Filter.All) {
      return Promise.resolve<TPlayer[]>(
        pList //?.filter((player) => player.type === selectedFilter)
      );
    } else {
      return Promise.resolve<TPlayer[]>(
        pList?.filter((player) => player.type === selectedFilter)
      );
    }
  };

  // 3rd priority to sort the final filtered player array based on selected sort
  const _getSortedPlayerList = (pList: TPlayer[]): Promise<TPlayer[]> => {
    if (selectedSortBy === SortBy.Name) {
      return Promise.resolve<TPlayer[]>(
        pList?.sort((a, b) => {
          const aName = a.name ?? "";
          const bName = b.name ?? "";
          return aName < bName ? -1 : 1;
        })
      );
    }
    if (selectedSortBy === SortBy.Age) {
      return Promise.resolve<TPlayer[]>(
        pList?.sort((a, b) => {
          const aAge = getAge(a.dob ?? 0);
          const bAge = getAge(b.dob ?? 0);
          return aAge === bAge ? 0 : bAge > aAge ? 1 : -1;
        })
      );
    }
    if (selectedSortBy === SortBy.Rank) {
      return Promise.resolve<TPlayer[]>(
        pList?.sort((a, b) => {
          const aRank = a.rank ?? 0;
          const bRank = b.rank ?? 0;
          return aRank < bRank ? -1 : 1;
        })
      );
    }
    return Promise.resolve<TPlayer[]>([]);
  };

  // final function to get filtered and sorted Player Array
  const getFinalPlayerList = async (): Promise<FinalPList> => {
    let _searchedPlayerList: TPlayer[] = [];
    let _flteredPList: TPlayer[] = [];
    let _sortedPList: TPlayer[] = [];

    const _pList = await getPlayers();
    const count = _pList?.length;

    _searchedPlayerList = await _getSearchedPlayerList(_pList);
    if (_searchedPlayerList?.length > 0) {
      _flteredPList = await _getFilteredPlayerList(_searchedPlayerList);
    }
    if (_flteredPList?.length > 0) {
      _sortedPList = await _getSortedPlayerList(_flteredPList);
    }
    if (_sortedPList?.length > 0) {
      return { pList: _sortedPList, count: count };
    } else {
      return { pList: [] as TPlayer[], count: count };
    }
  };
  // useEffect to execute finalList array of player whenever dependency array changes
  useEffect(() => {
    const loadPList = async () => {
      const playerList = await getFinalPlayerList();
      if (playerList?.pList?.length <= 10) {
        setPlayerList([...playerList?.pList]);
      } else if (playerList?.pList?.length > 10) {
        setMoreItemAvailable(true);
        setPlayerList([...playerList?.pList?.slice(0, 10)]);
      }
    };
    loadPList();
  }, [searchText, selectedSortBy, selectedFilter]);

  return {
    playerList,
    getPlayers,
    onChangeSearchText,
    selectedFilter,
    setSelectedFilter,
    resetFilter,
    selectedPlayer,
    setSelectedPlayer,
    getSimilarPlayer,
    similarPlayer,
    getAge,
    selectedSortBy,
    setSelectedSortBy,
    resetSortBy,
    moreItemAvailable,
    fetchMoreItem,
    skip,
    setSkip,
  };
};
