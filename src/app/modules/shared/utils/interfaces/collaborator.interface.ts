
export interface Collaborator {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
  job_title: string;
  admission_date: Date;
  created_at?: Date;
  updated_at?: Date;
}