import { useReducer, createContext, ReactNode, ChangeEvent } from "react";
import { TaskReducer, initialState } from "../store/task";
import type { Collaborator, NewProject, Project } from "../types";

export interface TaskContextProps {
  projects: Project[]
  toggleFilter: Boolean,
  theme: Boolean,
  projectModal: Boolean,
  projectForm: NewProject,
  addProject: (project: Project) => void
  switchTheme: () => void,
  switchToggleFilter: () => void,
  handleProjectForm: (e: ChangeEvent<HTMLInputElement>) => void,
  openProjectModal: () => void,
  closeProjectModal: () => void,
  addCollaborator: (username: Collaborator["username"]) => void,
  removeCollaborator: (username: Collaborator["username"]) => void
}

export const TaskContext = createContext<TaskContextProps>({
  projects: [],
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: {
    name: "",
    description: "",
    endDate: "",
    collaborators: []
  },
  addProject: () => { },
  switchTheme: () => { },
  switchToggleFilter: () => { },
  openProjectModal: () => { },
  closeProjectModal: () => { },
  handleProjectForm: () => { },
  addCollaborator: () => { },
  removeCollaborator: () => { },
})

function TaskProvider({ children }: { children: ReactNode }) {
  //#region state

  const [state, dispatch] = useReducer(TaskReducer, initialState)

  //#endregion

  //#region Functions

  function addProject(project: Project) {
    dispatch({ type: "add-project", payload: { project: project } })
  }

  function switchTheme() {
    dispatch({ type: "switch-theme" })
  }

  function switchToggleFilter() {
    dispatch({ type: "switch-toggle-filter" })
  }

  function openProjectModal() {
    dispatch({ type: "open-project-modal" })
  }

  function closeProjectModal() {
    dispatch({ type: "close-project-modal" })
  }

  function handleProjectForm(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "handle-project-form", payload: { e } })
  }

  function addCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "add-collaborator", payload: { username } })
  }

  function removeCollaborator(username: Collaborator["username"]) {
    dispatch({ type: "remove-collaborator", payload: { username } })
  }

  //#endregion

  return (
    <TaskContext.Provider value={{
      projects: state.projects,
      theme: state.theme,
      projectModal: state.projectModal,
      toggleFilter: state.toggleFilter,
      projectForm: state.projectForm,
      addProject,
      switchTheme,
      switchToggleFilter,
      openProjectModal,
      closeProjectModal,
      handleProjectForm,
      addCollaborator,
      removeCollaborator
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider