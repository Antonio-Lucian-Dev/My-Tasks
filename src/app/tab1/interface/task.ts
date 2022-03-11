import { Status } from './status';

export interface Task {
  title: string;
  description: string;
  status: Status;
  taskDate: Date;
}
