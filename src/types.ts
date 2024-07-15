export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  attachment_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  framework: 'node' | 'go' | 'rails' | 'django';
  version: string;
  stack: string;
  cloud_dependencies: string;
}
