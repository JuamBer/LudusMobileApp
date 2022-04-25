import { Gender } from "./Gender";
import { Type } from "./Type.model";

export interface Filter {
  //types: string[];
  genders: string[];
  players: string,
  //time: string,
  complexity: string;
  text: string;
}
