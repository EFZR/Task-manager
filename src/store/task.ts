import { ChangeEvent } from "react";
import { projects } from "../data";
import {
  Collaborator,
  List,
  NewProject,
  Project,
  Task,
  NewTask,
} from "../types";
import { DropResult } from "@hello-pangea/dnd";

// TODO: Establish a relationship between each collaborator and their corresponding user entity

export type TaskAction =
  | { type: "add-project"; payload: { project: Project } }
  | { type: "add-task"; payload: { task: Task } }
  | { type: "current-project"; payload: { project: Project } }
  | { type: "current-project-form"; payload: { project: Project } }
  | {
      type: "add-collaborator";
      payload: { username: Collaborator["username"] };
    }
  | {
      type: "remove-collaborator";
      payload: { username: Collaborator["username"] };
    }
  | { type: "on-drag-end"; payload: { result: DropResult } }
  | {
      type: "handle-project-form";
      payload: { e: ChangeEvent<HTMLInputElement> };
    }
  | { type: "handle-task-form"; payload: { e: ChangeEvent<HTMLInputElement> } }
  | { type: "switch-toggle-filter" }
  | { type: "switch-theme" }
  | { type: "open-project-modal" }
  | { type: "close-project-modal" }
  | { type: "open-task-modal" }
  | { type: "close-task-modal" }
  | { type: "clean" };

export type TaskState = {
  projects: Project[];
  toggleFilter: boolean;
  theme: boolean;
  projectModal: boolean;
  projectForm: NewProject;
  taskModal: boolean;
  taskForm: NewTask;
  currentProject: Project;
  activeProjectId: Project["id"];
  activeTaskId: Task["id"];
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
  lists: [],
};

export const initialTaskForm: NewTask = {
  description: "",
  title: "",
};

export const initialState: TaskState = {
  projects: projects,
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: intialProjectForm,
  taskModal: false,
  taskForm: initialTaskForm,
  currentProject: initialProject,
  activeProjectId: "",
  activeTaskId: "",
};

export const TaskReducer = (
  state: TaskState = initialState,
  action: TaskAction
) => {
  if (action.type === "add-project") {
    // Edit project
    if (state.activeProjectId) {
      const updProjects = state.projects.map((project) => {
        if (project.id === state.activeProjectId) {
          return action.payload.project;
        }
        return project;
      });

      return {
        ...state,
        projects: updProjects,
        projectModal: false,
        currentProject: action.payload.project,
        activeProjectId: action.payload.project.id,
        projectForm: intialProjectForm,
      };
    }

    // Save Project
    else {
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        projectModal: false,
        currentProject: action.payload.project,
        activeProjectId: action.payload.project.id,
        projectForm: {
          name: action.payload.project.name,
          endDate: action.payload.project.endDate,
          collaborators: action.payload.project.collaborators,
          description: action.payload.project.description,
        },
      };
    }
  }

  if (action.type === "add-task") {
    if (state.activeTaskId) {
      return {
        ...state,
        taskModal: false,
        taskForm: initialTaskForm,
      };
    } else {
      return {
        ...state,
        taskModal: false,
        taskForm: initialTaskForm,
        activeTaskId: "",
      };
    }
  }

  if (action.type === "current-project") {
    return {
      ...state,
      currentProject: action.payload.project,
      activeProjectId: action.payload.project.id,
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

  if (action.type === "on-drag-end") {
    const { destination, source, draggableId } = action.payload.result;
    const { lists } = state.currentProject;

    if (!destination) return state;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return state;

    const startList: List | undefined = lists.find(
      (list) => list.id === source.droppableId
    );
    const endList: List | undefined = lists.find(
      (list) => list.id === destination.droppableId
    );

    if (!startList || !endList) {
      return state;
    }

    if (startList === endList) {
      const currentList: List | undefined = lists.find(
        (list) => list.id === source.droppableId
      );
      const currentTask: Task | undefined = lists
        .find((list) => list.tasks.find((task) => task.id === draggableId))
        ?.tasks.find((task) => task.id === draggableId);

      if (!currentList) return state;
      if (!currentTask) return state;

      const newTasksId = Array.from(currentList?.tasks || []);
      newTasksId.splice(source.index, 1);
      newTasksId.splice(destination.index, 0, currentTask);

      const newCurrentList: List = {
        ...currentList,
        tasks: newTasksId,
      };

      const updatedLists: List[] = lists.map((list) => {
        if (list.id === newCurrentList.id) {
          return newCurrentList;
        }
        return list;
      });

      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          lists: updatedLists,
        },
      };
    }

    // Moving from one list to other
    const startTasks: Task[] = startList.tasks;
    const task: Task | undefined = startTasks.find(
      (task) => task.id === draggableId
    );
    startTasks.splice(source.index, 1);
    const newStartList: List = {
      ...startList,
      tasks: startTasks,
    };

    if (!task) {
      return state;
    }

    const endTasks: Task[] = endList.tasks;
    endTasks.splice(destination.index, 0, task);
    const newFinishList: List = {
      ...endList,
      tasks: endTasks,
    };

    const updatedLists: List[] = state.currentProject.lists.map((list) => {
      if (list.id === newStartList.id) {
        return newStartList;
      }

      if (list.id === newFinishList.id) {
        return newFinishList;
      }

      return list;
    });

    return {
      ...state,
      currentProject: {
        ...state.currentProject,
        lists: updatedLists,
      },
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

  if (action.type === "handle-task-form") {
    return {
      ...state,
      taskForm: {
        ...state.taskForm,
        [action.payload.e.target.name]: action.payload.e.target.value,
      },
    };
  }

  if (action.type === "switch-toggle-filter") {
    return {
      ...state,
      toggleFilter: !state.toggleFilter,
    };
  }

  if (action.type === "switch-theme") {
    return {
      ...state,
      theme: !state.theme,
    };
  }

  if (action.type === "open-project-modal") {
    return {
      ...state,
      projectModal: true,
    };
  }

  if (action.type === "close-project-modal") {
    if (state.activeProjectId) {
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

  if (action.type === "open-task-modal") {
    return {
      ...state,
      taskModal: true,
    };
  }

  if (action.type === "close-task-modal") {
    return {
      ...state,
      taskModal: false,
    };
  }

  if (action.type === "clean") {
    return {
      ...state,
      projectForm: intialProjectForm,
      taskForm: initialTaskForm,
      currentProject: initialProject,
      activeProjectId: "",
    };
  }

  return state;
};
