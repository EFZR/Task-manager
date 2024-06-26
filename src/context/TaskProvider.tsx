import { useReducer, createContext, ReactNode, ChangeEvent } from "react";
import { DropResult } from "@hello-pangea/dnd";
import {
  TaskReducer,
  initialProject,
  initialState,
  initialTaskForm,
  intialProjectForm,
} from "../store/task";
import type {
  Collaborator,
  NewProject,
  NewTask,
  Project,
  Task,
  List,
} from "../types";

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
  deleteProject: (projectId: Project["id"]) => void;
  deleteTask: (taskId: Task["id"], listId: List["id"]) => void;
  setCurrentProject: (project: Project) => void;
  addCollaborator: (username: Collaborator["username"]) => void;
  removeCollaborator: (username: Collaborator["username"]) => void;
  onDragEnd: (result: DropResult) => void;
  handleProjectForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTaskForm: (e: ChangeEvent<HTMLInputElement>) => void;
  switchToggleFilter: () => void;
  switchTheme: () => void;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  openTaskModal: (activeListId: List["id"]) => void;
  closeTaskModal: () => void;
  setActiveTask: (taskId: Task["id"], listId: List["id"]) => void;
  setActiveProject: (projectId: Project["id"]) => void;
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
  deleteProject: () => {},
  deleteTask: () => {},
  setCurrentProject: () => {},
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
  setActiveTask: () => {},
  setActiveProject: () => {},
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

  function deleteProject(projectId: Project["id"]) {
    dispatch({ type: "delete-project", payload: { projectId } });
  }

  function deleteTask(taskId: Task["id"], listId: List["id"]) {
    dispatch({ type: "delete-task", payload: { taskId, listId } });
  }

  function setCurrentProject(project: Project) {
    dispatch({ type: "current-project", payload: { project } });
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

  function openTaskModal(activeListId: List["id"]) {
    dispatch({ type: "open-task-modal", payload: { activeListId } });
  }

  function closeTaskModal() {
    dispatch({ type: "close-task-modal" });
  }

  function setActiveTask(taskId: Task["id"], listId: List["id"]) {
    dispatch({ type: "set-active-task", payload: { taskId, listId } });
  }

  function setActiveProject(projectId: Project["id"]) {
    dispatch({ type: "set-active-project", payload: { projectId } });
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
        deleteProject,
        deleteTask,
        setCurrentProject,
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
        setActiveTask,
        setActiveProject,
        clean,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
