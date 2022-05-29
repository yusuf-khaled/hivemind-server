export interface Member {
  id: string;
  team_id: string;
  name: string;
  email: string;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateMemberInput {
  name: string;
  team_id: string;
  email: string;
  title: string;
  created_by: string;
}
