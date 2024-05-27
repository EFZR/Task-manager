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
  | { type: "open-task-modal"; payload: { activeListId: List["id"] } }
  | { type: "close-task-modal" }
  | { type: "clean" };

export type TaskState = {
  projects: Project[];
  projectModal: boolean;
  projectForm: NewProject;
  taskModal: boolean;
  taskForm: NewTask;
  activeProjectId: Project["id"];
  activeListId: List["id"];
  activeTaskId: Task["id"];
  toggleFilter: boolean;
  theme: boolean;
  currentProject: Project;
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
  activeListId: "",
};

export const TaskReducer = (
  state: TaskState = initialState,
  action: TaskAction
) => {
  if (action.type === "add-project") {
    // Edit project
    if (state.activeProjectId) {
      const currentProject = { ...action.payload.project };
      const projects = state.projects.map((project) => {
        if (project.id === state.activeProjectId) {
          return action.payload.project;
        }
        return project;
      });

      return {
        ...state,
        projects,
        currentProject,
        projectModal: false,
        projectForm: intialProjectForm,
      };
    }

    // Save Project
    else {
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
        projectModal: false,
        projectForm: intialProjectForm,
      };
    }
  }

  if (action.type === "add-task") {
    // Edit task.
    if (state.activeTaskId) {
      return {
        ...state,
        taskModal: false,
        taskForm: initialTaskForm,
      };
    }

    // Add a new Task.
    else {
      const { lists } = state.currentProject;
      const currentListIndex: number = lists.findIndex(
        (list) => list.id === state.activeListId
      );

      if (currentListIndex === -1) {
        return state;
      }

      const currentList: List = lists[currentListIndex];

      const updatedList: List = {
        ...currentList,
        tasks: [...currentList.tasks, action.payload.task],
      };

      const updatedLists: List[] = [
        ...lists.slice(0, currentListIndex),
        updatedList,
        ...lists.slice(currentListIndex + 1),
      ];

      const currentProject = {
        ...state.currentProject,
        lists: updatedLists,
      };

      const projects = state.projects.map((project) => {
        if (project.id === currentProject.id) {
          return currentProject;
        }
        return project;
      });

      return {
        ...state,
        taskModal: false,
        taskForm: initialTaskForm,
        activeTaskId: "",
        currentProject,
        projects,
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
    let updatedLists: List[];

    if (!destination) {
      return state;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return state;
    }

    const startList: List | undefined = lists.find(
      (list) => list.id === source.droppableId
    );
    const endList: List | undefined = lists.find(
      (list) => list.id === destination.droppableId
    );

    if (!startList || !endList) {
      return state;
    }

    // Moving a task in the same list
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

      updatedLists = lists.map((list) => {
        if (list.id === newCurrentList.id) {
          return newCurrentList;
        }
        return list;
      });
    }

    // Moving a task from one list to other.
    else {
      const startTasks: Task[] = [...startList.tasks];
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

      const endTasks: Task[] = [...endList.tasks];
      endTasks.splice(destination.index, 0, task);
      const newFinishList: List = {
        ...endList,
        tasks: endTasks,
      };

      updatedLists = state.currentProject.lists.map((list) => {
        if (list.id === newStartList.id) {
          return newStartList;
        }

        if (list.id === newFinishList.id) {
          return newFinishList;
        }

        return list;
      });
    }

    const currentProject = {
      ...state.currentProject,
      lists: updatedLists,
    };

    const projects = state.projects.map((project) => {
      if (currentProject.id === project.id) {
        return currentProject;
      }
      return project;
    });

    return {
      ...state,
      currentProject,
      projects,
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
      activeListId: action.payload.activeListId,
    };
  }

  if (action.type === "close-task-modal") {
    return {
      ...state,
      taskModal: false,
      activeListId: "",
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
