import { Game } from "./Game";

export interface ExploreGames {
  popular_games?: Game[];
  new_games?: Game[];
  patrocinated_game?: Game;
  card_games?: Game[];
  quick_games?: Game[];
}
