export interface TeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  avatarUrl: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CreateTeamInput {
  name: string;
  created_by: string;
}

export const formatTeamForDb = (data: any): Object => {
  return {
    id: data.id,
    name: data.name,
    created_at: data.createdAt ? data.createdAt : null,
    updated_at: data.updatedAt ? data.updatedAt : null,
    deleted_at: data.deletedAt ? data.deletedAt : null,
  };
};

export const formatTeamForGraphql = (data: any): Team => {
  return {
    id: data.id,
    name: data.name,
    members: data.members,
    createdAt: data.created_at ? data.created_at : null,
    updatedAt: data.updated_at ? data.updated_at : null,
    deletedAt: data.deleted_at ? data.deleted_at : null,
  };
};
