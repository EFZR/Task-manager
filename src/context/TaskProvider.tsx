import { useReducer, createContext, ReactNode, ChangeEvent } from "react";
import {
  TaskReducer,
  initialProject,
  initialState,
  initialTaskForm,
  intialProjectForm,
} from "../store/task";
import type { Collaborator, NewProject, NewTask, Project, Task } from "../types";
import { DropResult } from "@hello-pangea/dnd";

export interface TaskContextProps {
  projects: Project[];
  toggleFilter: boolean;
  theme: boolean;
  projectModal: boolean;
  taskModal: boolean;
  projectForm: NewProject;
  taskForm: NewTask;
  activeProjectId: Project["id"];
  activeTaskId: Task["id"];
  currentProject: Project;
  addProject: (project: Project) => void;
  addTask: (task: Task) => void;
  setCurrentProject: (project: Project) => void;
  setCurrentProjectForm: (project: Project) => void;
  addCollaborator: (username: Collaborator["username"]) => void;
  removeCollaborator: (username: Collaborator["username"]) => void;
  onDragEnd: (result: DropResult) => void;
  handleProjectForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTaskForm: (e: ChangeEvent<HTMLInputElement>) => void;
  switchToggleFilter: () => void;
  switchTheme: () => void;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  openTaskModal: () => void;
  closeTaskModal: () => void;
  clean: () => void;
}

export const TaskContext = createContext<TaskContextProps>({
  projects: [],
  toggleFilter: false,
  theme: false,
  projectModal: false,
  taskModal: false,
  projectForm: intialProjectForm,
  taskForm: initialTaskForm,
  currentProject: initialProject,
  activeProjectId: "",
  activeTaskId: "",
  addProject: () => {},
  addTask: () => {},
  setCurrentProject: () => {},
  setCurrentProjectForm: () => {},
  addCollaborator: () => {},
  removeCollaborator: () => {},
  onDragEnd: () => {},
  handleProjectForm: () => {},
  handleTaskForm: () => {},
  switchToggleFilter: () => {},
  switchTheme: () => {},
  openProjectModal: () => {},
  closeProjectModal: () => {},
  openTaskModal: () => {},
  closeTaskModal: () => {},
  clean: () => {},
});

function TaskProvider({ children }: { children: ReactNode }) {
  //#region state

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //#endregion

  //#region Functions

  function addProject(project: Project) {
    dispatch({ type: "add-project", payload: { project: project } });
  }

  function addTask(task: Task) {
    dispatch({ type: "add-task", payload: { task } });
  }

  function setCurrentProject(project: Project) {
    dispatch({ type: "current-project", payload: { project } });
  }

  function setCurrentProjectForm(project: Project) {
    dispatch({ type: "current-project-form", payload: { project } });
  }

  function addCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "add-collaborator", payload: { username } });
  }

  function removeCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "remove-collaborator", payload: { username } });
  }

  function onDragEnd(result: DropResult) {
    dispatch({ type: "on-drag-end", payload: { result } });
  }

  function handleProjectForm(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "handle-project-form", payload: { e } });
  }

  function handleTaskForm(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "handle-task-form", payload: { e } });
  }

  function switchToggleFilter() {
    dispatch({ type: "switch-toggle-filter" });
  }

  function switchTheme() {
    dispatch({ type: "switch-theme" });
  }

  function openProjectModal() {
    dispatch({ type: "open-project-modal" });
  }

  function closeProjectModal() {
    dispatch({ type: "close-project-modal" });
  }

  function openTaskModal() {
    dispatch({ type: "open-task-modal" });
  }

  function closeTaskModal() {
    dispatch({ type: "close-task-modal" });
  }

  function clean() {
    dispatch({ type: "clean" });
  }

  //#endregion

  return (
    <TaskContext.Provider
      value={{
        currentProject: state.currentProject,
        projects: state.projects,
        theme: state.theme,
        projectModal: state.projectModal,
        taskModal: state.taskModal,
        toggleFilter: state.toggleFilter,
        projectForm: state.projectForm,
        taskForm: state.taskForm,
        activeProjectId: state.activeProjectId,
        activeTaskId: state.activeTaskId,
        addProject,
        addTask,
        setCurrentProject,
        setCurrentProjectForm,
        addCollaborator,
        removeCollaborator,
        onDragEnd,
        handleProjectForm,
        handleTaskForm,
        switchToggleFilter,
        switchTheme,
        openProjectModal,
        closeProjectModal,
        openTaskModal,
        closeTaskModal,
        clean,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
