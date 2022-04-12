export interface Game {
  id?: string;
  ids_genders: string[];
  id_type: string;
  name: string;
  min_players: number;
  max_players: number;
  min_time: number;
  max_time: number;
  age: string;
  preparation: string;
  complexity: string;
  strategy: string;
  random: string;
  video_url: string;
  summary: string;
  description: string;
}
