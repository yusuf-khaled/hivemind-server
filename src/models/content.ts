export interface Content {
  id: string;
  brainwave_id: number;
  content: string;
  created_by: string;
  last_edited_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateContentInput {
  brainwave_id: number;
  content: string;
  creator: string;
}

export interface EditContentInput {
  id: number;
  content: string;
  editor: string;
}
