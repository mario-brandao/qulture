import { Collaborator } from "./collaborator.interface";

export interface Comment {
  id: number;
  value: string;
  user_id: number;
  user: Collaborator;
}
