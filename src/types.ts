export interface Folder {
  id: string;
  name: string;
  description: string;
  order: number;
  color?: string;
}

export interface Session {
  id: string;
  folderId: string | null;
  name: string;
  isPinned: boolean;
  currentStep: number;
  data: Record<string, any>;
}

export interface StepContent {
  title: string;
  content: string;
}
