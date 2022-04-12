import { Game } from "./Game";

export interface ExploreGames {
  populars_games?: Game[];
  new_games?: Game[];
  patrocinated_game?: Game;
  naipes_games?: Game[];
  fast_games?: Game[];
  recomendeds_games?: Game[];
}
