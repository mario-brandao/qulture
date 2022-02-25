import { Collaborator } from "../modules/shared/utils/models/collaborator.model";

const emptyCollab = new Collaborator();
const mockData = {
  id: 1,
  name: 'collab1-name',
  email: 'collab1-email@gmail.com',
  job_title: 'collab1-job_title',
  photo_url: 'collab1-photo_url',
  admission_date: new Date(),
};

export const CollabMock: Collaborator = Object.assign(emptyCollab, mockData);
