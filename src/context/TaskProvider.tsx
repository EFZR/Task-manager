import { useReducer, createContext, ReactNode, ChangeEvent } from "react";
import {
  TaskReducer,
  initialProject,
  initialState,
  intialProjectForm,
} from "../store/task";
import type { Collaborator, List, NewProject, Project } from "../types";

export interface TaskContextProps {
  projects: Project[];
  toggleFilter: Boolean;
  theme: Boolean;
  projectModal: Boolean;
  projectForm: NewProject;
  currentProject: Project;
  activeId: Project["id"];
  addProject: (project: Project) => void;
  switchTheme: () => void;
  switchToggleFilter: () => void;
  handleProjectForm: (e: ChangeEvent<HTMLInputElement>) => void;
  clean: () => void;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  addCollaborator: (username: Collaborator["username"]) => void;
  removeCollaborator: (username: Collaborator["username"]) => void;
  setCurrentProject: (project: Project) => void;
  setCurrentProjectForm: (project: Project) => void;
  reorderLists: (list: List) => void;
  moveLists: (startList: List, endList: List) => void;
}

export const TaskContext = createContext<TaskContextProps>({
  projects: [],
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: intialProjectForm,
  currentProject: initialProject,
  activeId: "",
  addProject: () => {},
  switchTheme: () => {},
  switchToggleFilter: () => {},
  openProjectModal: () => {},
  closeProjectModal: () => {},
  handleProjectForm: () => {},
  clean: () => {},
  addCollaborator: () => {},
  removeCollaborator: () => {},
  setCurrentProject: () => {},
  setCurrentProjectForm: () => {},
  reorderLists: () => {},
  moveLists: () => {},
});

function TaskProvider({ children }: { children: ReactNode }) {
  //#region state

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //#endregion

  //#region Functions

  function addProject(project: Project) {
    dispatch({ type: "add-project", payload: { project: project } });
  }

  function switchTheme() {
    dispatch({ type: "switch-theme" });
  }

  function switchToggleFilter() {
    dispatch({ type: "switch-toggle-filter" });
  }

  function openProjectModal() {
    dispatch({ type: "open-project-modal" });
  }

  function closeProjectModal() {
    dispatch({ type: "close-project-modal" });
  }

  function handleProjectForm(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "handle-project-form", payload: { e } });
  }

  function clean() {
    dispatch({ type: "clean" });
  }

  function addCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "add-collaborator", payload: { username } });
  }

  function removeCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "remove-collaborator", payload: { username } });
  }

  function setCurrentProject(project: Project) {
    dispatch({ type: "current-project", payload: { project } });
  }

  function setCurrentProjectForm(project: Project) {
    dispatch({ type: "current-project-form", payload: { project } });
  }

  function reorderLists(list: List) {
    dispatch({ type: "reorder-lists", payload: { list } });
  }

  function moveLists(startList: List, endList: List) {
    dispatch({ type: "move-lists", payload: { startList, endList } });
  }

  //#endregion

  return (
    <TaskContext.Provider
      value={{
        projects: state.projects,
        theme: state.theme,
        projectModal: state.projectModal,
        toggleFilter: state.toggleFilter,
        projectForm: state.projectForm,
        currentProject: state.currentProject,
        activeId: state.activeId,
        addProject,
        switchTheme,
        switchToggleFilter,
        openProjectModal,
        closeProjectModal,
        handleProjectForm,
        clean,
        addCollaborator,
        removeCollaborator,
        setCurrentProject,
        setCurrentProjectForm,
        reorderLists,
        moveLists
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
