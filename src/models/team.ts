export interface Team {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateTeamInput {
  name: string;
  created_by: string;
}
