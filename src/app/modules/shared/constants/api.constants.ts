import { environment } from "src/environments/environment";

export const API = Object.freeze({
  COLLABORATORS: `${environment.baseAPI}users`,
  COMMENTS: `${environment.baseAPI}comments`,
});
