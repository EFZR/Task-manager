import { ChangeEvent } from "react";
import { projects } from "../data";
import { Collaborator, NewProject, Project } from "../types";

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
  | {
      type: "add-collaborator";
      payload: { username: Collaborator["username"] };
    }
  | {
      type: "remove-collaborator";
      payload: { username: Collaborator["username"] };
    };

export type TaskState = {
  projects: Project[];
  toggleFilter: boolean;
  theme: boolean;
  projectModal: boolean;
  projectForm: NewProject;
};

export const initialState: TaskState = {
  projects: projects,
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: {
    name: "",
    description: "",
    endDate: "",
    collaborators: [],
  },
};

export const TaskReducer = (
  state: TaskState = initialState,
  action: TaskActions
) => {
  if (action.type === "add-project") {
    return {
      ...state,
      projects: [...state.projects, action.payload.project],
      projectModal: false,
      projectForm: {
        name: "",
        description: "",
        endDate: "",
        collaborators: [],
      },
    };
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
      toggle: !state.toggleFilter,
    };
  }

  if (action.type === "open-project-modal") {
    return {
      ...state,
      projectModal: true,
    };
  }

  if (action.type === "close-project-modal") {
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

  return state;
};
