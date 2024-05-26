export type Project = {
  id: string;
  name: string;
  description: string;
  endDate: string;
  complete: Boolean;
  collaborators: Collaborator[];
  lists: List[];
};

export type NewProject = Pick<
  Project,
  "name" | "description" | "endDate" | "collaborators"
>;

export type List = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
};

export type NewTask = Omit<Task, "id">;

export type User = {
  username: string;
  pwd: string;
};

export type Collaborator = Omit<User, "pwd">;
