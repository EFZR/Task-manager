import { projects } from "../data";
import { Project } from "../types";

export type TaskActions = {};

export type TaskState = {
  projects: Project[],
};

export const initialState: TaskState = {
  projects: projects
};

export const TaskReducer = (
  state: TaskState = initialState,
  _action: TaskActions
) => {
  return state;
};