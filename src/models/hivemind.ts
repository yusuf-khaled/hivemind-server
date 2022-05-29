export interface HiveMind {
  id: string;
  team_id: string;
  created_by: string;
  name: string;
  code: string;
  goal: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateHiveMindInput {
  team_id: string;
  creator: string;
  name: string;
  code: string;
  goal: string;
}
