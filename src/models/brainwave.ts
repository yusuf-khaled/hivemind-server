export enum BrainWaveType {
  Reflection = 'reflection',
  Spike = 'spike',
  Teaching = 'teaching',
  Practice = 'practice'
}

export enum BrainWaveStatus {
  Todo = 'todo',
  Wip = 'wip',
  Review = 'review',
  Done = 'done'
}

export interface BrainWave {
  id: string;
  code: string;
  createdBy: string;
  createdByAvatarUrl: string;
  assignedTo: string;
  assignedToAvatarUrl: string;
  dueAt: string;
  hiveMindId: string;
  title: string;
  description: string;
  type: BrainWaveType;
  typeIconUrl: string;
  status: BrainWaveStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CreateBrainWaveInput {
  input: {
    hiveMindId: string;
    creator: string;
    assignee: string;
    dueAt: string;
    title: string;
    description: string;
    type: BrainWaveType;
    status: BrainWaveStatus;
  }
}

export interface TransmitBrainWaveInput {
  brainWaveId: string;
  creator: string;
  content: string;
}

const brainWaveTypeIconUrls: any = {
  'spike': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/spike.png',
  'learning': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/learning.png',
  'practice': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/practice.png',
  'reflection': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/reflection.png',
};

export const formatBrainwaveForDb = (data: any): Object => {
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

export const formatBrainwaveForGraphql = (data: any): BrainWave => {
  console.log('data.hivemind_id:', data.hivemind_id);
  return {
    id: data.id,
    code: data.brainWaveCode,
    createdBy: data.created_by,
    createdByAvatarUrl: data.created_by_avatar_url,
    assignedTo: data.assigned_to,
    assignedToAvatarUrl: data.assigned_to_avatar_url,
    dueAt: data.due_at,
    hiveMindId: data.hivemind_id,
    title: data.title,
    description: data.description,
    type: data.type,
    typeIconUrl: brainWaveTypeIconUrls[data.type],
    status: data.status,
    createdAt: data.created_at ? data.created_at : null,
    updatedAt: data.updated_at ? data.updated_at : null,
    deletedAt: data.deleted_at ? data.deleted_at : null,
  };
};
