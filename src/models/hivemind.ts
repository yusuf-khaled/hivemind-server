export interface HiveMind {
  id: string;
  teamId: string;
  teamName: string;
  createdBy: string;
  createdByAvatarUrl: string;
  name: string;
  code: string;
  goal: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CreateHiveMindInput {
  input: {
    name: string;
    code: string;
    goal: string;
    teamId: string;
    createdBy: string;
  }
}

export const formatHiveMindForDb = (data: any): Object => {
  return {
    id: data.id,
    team_id: data.teamId,
    created_by: data.createdBy,
    name: data.name,
    code: data.code,
    goal: data.goal,
    created_at: data.createdAt ? data.createdAt : null,
    updated_at: data.updatedAt ? data.updatedAt : null,
    deleted_at: data.deletedAt ? data.deletedAt : null,
  };
};

export const formatHiveMindForGraphql = (data: any): HiveMind => {
  return {
    id: data.id,
    teamId: data.teamId,
    teamName: data.teamName,
    createdBy: data.created_by,
    createdByAvatarUrl: data.created_by_avatar_url,
    name: data.name,
    code: data.code,
    goal: data.goal,
    createdAt: data.created_at ? data.created_at : null,
    updatedAt: data.updated_at ? data.updated_at : null,
    deletedAt: data.deleted_at ? data.deleted_at : null,
  };
};
