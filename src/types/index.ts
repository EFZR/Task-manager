export type Project = {
  id: string,
  name: string,
  description: string,
  endDate: Date,
  complete: Boolean,
  collaborators: Collaborator[]
  tasks: Task[]
}

export type User = {
  username: string,
  pwd: string,
}

export type Collaborator = Omit<User, "pwd">;

export type Task = {
  id: string,
  title: string,
  description: string,
}