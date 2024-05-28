import { ChangeEvent } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { projects } from "../data";
import {
  Collaborator,
  List,
  NewProject,
  Project,
  Task,
  NewTask,
} from "../types";
import { formatInputDate } from "../helpers";

// TODO: Establish a relationship between each collaborator and their corresponding user entity

export type TaskAction =
  | { type: "add-project"; payload: { project: Project } }
  | { type: "add-task"; payload: { task: Task } }
  | { type: "delete-project"; payload: { projectId: Project["id"] } }
  | { type: "delete-task"; payload: { taskId: Task["id"]; listId: List["id"] } }
  | { type: "current-project"; payload: { project: Project } }
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
  | {
      type: "set-active-task";
      payload: { taskId: Task["id"]; listId: List["id"] };
    }
  | {
      type: "set-active-project";
      payload: { projectId: Project["id"] };
    }
  | { type: "clean" };

export type TaskState = {
  projects: Project[];
  projectModal: boolean;
  taskModal: boolean;
  projectForm: NewProject;
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
  endDate: formatInputDate(new Date()),
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

function localStorageProjects(): Project[] {
  const lsProjects = localStorage.getItem("projects");
  return lsProjects ? JSON.parse(lsProjects) : projects;
}

function localStorageCurrentProject(): Project {
  const currentProject = localStorage.getItem("current-project");
  return currentProject ? JSON.parse(currentProject) : initialProject;
}

export const initialState: TaskState = {
  projects: localStorageProjects(),
  currentProject: localStorageCurrentProject(),
  toggleFilter: false,
  theme: false,
  projectModal: false,
  projectForm: intialProjectForm,
  taskModal: false,
  taskForm: initialTaskForm,
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
      const updateProject: Project = {
        ...action.payload.project,
        lists: state.currentProject.lists,
        complete: state.currentProject.complete,
      };

      const projects = state.projects.map((project) => {
        if (project.id === state.activeProjectId) {
          return updateProject;
        }
        return project;
      });

      return {
        ...state,
        projects,
        currentProject: updateProject,
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
    // Setup & Fixtures
    const { lists } = state.currentProject;
    const currentListIndex: number = lists.findIndex(
      (list) => list.id === state.activeListId
    );

    if (currentListIndex === -1) {
      return state;
    }

    const currentList: List = lists[currentListIndex];

    let updatedList: List;
    let updatedLists: List[];
    let currentProject: Project;
    let projects: Project[];

    // Edit a task.
    if (state.activeTaskId && state.activeListId) {
      const updatedTasks: Task[] = currentList.tasks.map((task) => {
        if (task.id === state.activeTaskId) {
          return action.payload.task;
        }
        return task;
      });

      updatedList = {
        ...currentList,
        tasks: updatedTasks,
      };

      updatedLists = [
        ...lists.slice(0, currentListIndex),
        updatedList,
        ...lists.slice(currentListIndex + 1),
      ];

      currentProject = {
        ...state.currentProject,
        lists: updatedLists,
      };

      projects = state.projects.map((project) => {
        if (project.id === currentProject.id) {
          return currentProject;
        }
        return project;
      });
    }

    // Add a new Task.
    else {
      updatedList = {
        ...currentList,
        tasks: [...currentList.tasks, action.payload.task],
      };

      updatedLists = [
        ...lists.slice(0, currentListIndex),
        updatedList,
        ...lists.slice(currentListIndex + 1),
      ];

      currentProject = {
        ...state.currentProject,
        lists: updatedLists,
      };

      projects = state.projects.map((project) => {
        if (project.id === currentProject.id) {
          return currentProject;
        }
        return project;
      });
    }

    // return new state.
    return {
      ...state,
      taskModal: false,
      taskForm: initialTaskForm,
      activeTaskId: "",
      currentProject,
      projects,
    };
  }

  if (action.type === "delete-project") {
    const projects = state.projects.filter(
      (project) => project.id !== action.payload.projectId
    );
    return {
      ...state,
      projects,
    };
  }

  if (action.type === "delete-task") {
    const { lists } = state.currentProject;
    const currentListIndex: number = lists.findIndex(
      (list) => list.id === action.payload.listId
    );
    const currentList: List = lists[currentListIndex];
    const { tasks } = currentList;
    const updatedTasks: Task[] = tasks.filter(
      (task) => task.id !== action.payload.taskId
    );

    const updatedList: List = {
      ...currentList,
      tasks: updatedTasks,
    };

    const updatedLists: List[] = lists.map((list) => {
      if (list.id === updatedList.id) {
        return updatedList;
      }
      return list;
    });

    const currentProject: Project = {
      ...state.currentProject,
      lists: updatedLists,
    };

    const projects: Project[] = state.projects.map((project) => {
      if (project.id === currentProject.id) {
        return currentProject;
      }
      return project;
    });

    return {
      ...state,
      projects,
      currentProject,
    };
  }

  if (action.type === "current-project") {
    return {
      ...state,
      currentProject: action.payload.project,
      activeProjectId: action.payload.project.id,
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
        projectForm: intialProjectForm,
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
      taskForm: initialTaskForm,
      activeListId: "",
      activeTaskId: "",
    };
  }

  if (action.type === "set-active-task") {
    const { lists } = state.currentProject;
    const currentListIndex: number = lists.findIndex(
      (list) => list.id === action.payload.listId
    );

    if (currentListIndex === -1) {
      return state;
    }

    const currentList: List = lists[currentListIndex];
    const currentTaskIndex: number = currentList.tasks.findIndex(
      (task) => task.id === action.payload.taskId
    );
    const currentTask: Task = currentList.tasks[currentTaskIndex];
    const taskForm: NewTask = {
      description: currentTask.description,
      title: currentTask.title,
    };

    return {
      ...state,
      activeTaskId: action.payload.taskId,
      activeListId: action.payload.listId,
      taskForm,
      taskModal: true,
    };
  }

  if (action.type === "set-active-project") {
    const currentProjectIndex: number = state.projects.findIndex(
      (project) => project.id === action.payload.projectId
    );
    const currentProject: Project = state.projects[currentProjectIndex];
    const projectForm: NewProject = {
      ...currentProject,
    };

    return {
      ...state,
      projectForm,
      projectModal: true,
      activeProjectId: action.payload.projectId,
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
