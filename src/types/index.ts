export type Project = {
  id: string;
  name: string;
  description: string;
  endDate: string;
  complete: Boolean;
  collaborators: Collaborator[];
  tasks: Task[];
};

export type NewProject = Pick<
  Project,
  "name" | "description" | "endDate" | "collaborators"
>;

export type User = {
  username: string;
  pwd: string;
};

export type Collaborator = Omit<User, "pwd">;

export type Task = {
  id: string;
  title: string;
  description: string;
  state: State;
};

export type Column = {
  id: State;
  title: string;
  taskIds: Task[];
};

export type State = "todo" | "process" | "done";
