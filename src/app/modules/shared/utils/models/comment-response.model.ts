import { Comment } from "./comment.model";

export class CommentResponse {
  comments?: Comment[];
  comment?: Comment;

  constructor() {}
}
