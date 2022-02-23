import { Comment } from "./comment";

export interface CommentResponse {
  comments?: Comment[];
  comment?: Comment;
}
