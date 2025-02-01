export interface Task {
  _id?: string;
  user: { email: string; name: string };
  title: string;
  description: string;
  limitDate: Date;
  priority: boolean;
  status: Status;
}

export type Status = 'Pending' | 'In process' | 'Completed';
