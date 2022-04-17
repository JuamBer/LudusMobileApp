import { Gender } from "./Gender";
import { Type } from "./Type.model";

export interface Filter {
  genders: string[];
  types: string[];
}
