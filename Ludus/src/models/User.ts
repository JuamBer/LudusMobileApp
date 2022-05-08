export interface User {
  id: string;
  name: string;
  email: string;
  favs_games?: string[];
  ids_games?: string[];
  role?:string;
}
