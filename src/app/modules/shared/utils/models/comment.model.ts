import { Collaborator } from "./collaborator.model";

export class Comment {
  id!: number;
  value!: string;
  user_id!: number;
  user!: Collaborator;

  constructor() {}
}
