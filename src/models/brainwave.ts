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
  hivemind_id: string;
  hivemind_number: number;
  created_by: string;
  assigned_to: string;
  due_at: string;
  title: string;
  description: string;
  type: BrainWaveType;
  status: BrainWaveStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateBrainWaveInput {
  hivemind_id: string;
  hivemind_number: number;
  creator: string;
  assignee: string;
  due_at: string;
  title: string;
  description: string;
  type: BrainWaveType;
  status: BrainWaveStatus;
}
