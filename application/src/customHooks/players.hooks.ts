import { TPlayer, TMayBe, players } from "../services";

export const usePlayersHooks = () => {
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
      //.slice(skip, skip + 5)
    );
  };

  // const getPlayerDetails = (_id: string): Promise<TPlayer> => {
  //   return Promise.resolve<TPlayer>(
  //     (players as TPlayer[])
  //       .sort((a, b) => {
  //         const aPoints = a.points ?? 0;
  //         const bPoints = b.points ?? 0;

  //         return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
  //       })
  //       .map((it, index) => ({
  //         ...it,
  //         rank: index + 1,
  //       }))
  //       .slice(skip, skip + 5)
  //   );
  // };

  return {
    players,
    getPlayers,
  };
};
