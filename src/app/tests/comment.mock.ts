import { Comment } from "../modules/shared/utils/models/comment.model";
import { CollabMock } from "./collaborator.mock";

const emptyComment = new Comment();
const mockData = {
  id: 3,
  value: 'comment-value-mock',
  user_id: 1,
  user: CollabMock,
};

export const CommentMock = Object.assign(emptyComment, mockData);
