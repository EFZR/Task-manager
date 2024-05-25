import { ChangeEvent } from "react";
import { projects } from "../data";
import { Collaborator, NewProject, Project } from "../types";

// TODO: Establish a relationship between each collaborator and their corresponding user entity

export type TaskActions =
  | { type: "add-project"; payload: { project: Project } }
  | { type: "switch-toggle-filter" }
  | { type: "switch-theme" }
  | { type: "open-project-modal" }
  | { type: "close-project-modal" }
  | {
      type: "handle-project-form";
      payload: { e: ChangeEvent<HTMLInputElement> };
    }
  | { type: "clean" }
  | {
      type: "add-collaborator";
      payload: { username: Collaborator["username"] };
    }
  | {
      type: "remove-collaborator";
      payload: { username: Collaborator["username"] };
    }
  | {
      type: "current-project";
      payload: { project: Project };
    }
  | {
      type: "current-project-form";
      payload: { project: Project };
    };

export type TaskState = {
  projects: Project[];
  toggleFilter: boolean;
  theme: boolean;
  projectModal: boolean;
  projectForm: NewProject;
  currentProject: Project;
  activeId: Project["id"];
};

export const intialProjectForm: NewProject = {
  name: "",
  collaborators: [],
  description: "",
  endDate: "",
};

export const initialProject: Project = {
  id: "",
  name: "",
  collaborators: [],
  complete: false,
  description: "",
  endDate: "",
  tasks: [],
};

export const initialState: TaskState = {
  projects: projects,
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: intialProjectForm,
  currentProject: initialProject,
  activeId: "",
};

export const TaskReducer = (
  state: TaskState = initialState,
  action: TaskActions
) => {
  if (action.type === "add-project") {
    // Edit project
    if (state.activeId) {
      const updProjects = state.projects.map((project) => {
        if (project.id === state.activeId) {
          return action.payload.project;
        }
        return project;
      });

      return {
        ...state,
        projects: updProjects,
        projectModal: false,
        currentProject: action.payload.project,
        activeId: action.payload.project.id,
        projectForm: {
          name: action.payload.project.name,
          endDate: action.payload.project.endDate,
          collaborators: action.payload.project.collaborators,
          description: action.payload.project.description,
        },
      };
    }

    // Save Project
    else {
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        projectModal: false,
        currentProject: action.payload.project,
        activeId: action.payload.project.id,
        projectForm: {
          name: action.payload.project.name,
          endDate: action.payload.project.endDate,
          collaborators: action.payload.project.collaborators,
          description: action.payload.project.description,
        },
      };
    }
  }

  if (action.type === "switch-theme") {
    return {
      ...state,
      theme: !state.theme,
    };
  }

  if (action.type === "switch-toggle-filter") {
    return {
      ...state,
      toggleFilter: !state.toggleFilter,
    };
  }

  if (action.type === "open-project-modal") {
    return {
      ...state,
      projectModal: true,
    };
  }

  if (action.type === "close-project-modal") {
    if (state.activeId) {
      return {
        ...state,
        projectModal: false,
        projectForm: {
          name: state.currentProject.name,
          description: state.currentProject.description,
          collaborators: state.currentProject.collaborators,
          endDate: state.currentProject.endDate,
        },
      };
    }

    return {
      ...state,
      projectModal: false,
    };
  }

  if (action.type === "handle-project-form") {
    if (action.payload.e.target.name === "collaborator") {
      return state;
    }

    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        [action.payload.e.target.name]: action.payload.e.target.value,
      },
    };
  }

  if (action.type === "clean") {
    return {
      ...state,
      projectForm: intialProjectForm,
      currentProject: initialProject,
      activeId: "",
    };
  }

  if (action.type === "add-collaborator") {
    if (action.payload.username === "") {
      return state;
    }

    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        collaborators: [
          ...state.projectForm.collaborators,
          { username: action.payload.username },
        ],
      },
    };
  }

  if (action.type === "remove-collaborator") {
    const updateCollaborators = state.projectForm.collaborators.filter(
      (collaborator) => collaborator.username !== action.payload.username
    );

    return {
      ...state,
      projectForm: {
        ...state.projectForm,
        collaborators: updateCollaborators,
      },
    };
  }

  if (action.type === "current-project") {
    return {
      ...state,
      currentProject: action.payload.project,
      activeId: action.payload.project.id,
    };
  }

  if (action.type === "current-project-form") {
    return {
      ...state,
      projectForm: {
        name: action.payload.project.name,
        endDate: action.payload.project.endDate,
        collaborators: action.payload.project.collaborators,
        description: action.payload.project.description,
      },
    };
  }

  return state;
};
