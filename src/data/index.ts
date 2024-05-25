import { v4 as uuidv4 } from "uuid";
import { formatInputDate } from "../helpers";
import { Column, Project } from "../types";

export const projects: Project[] = [
  {
    id: uuidv4(),
    name: "Launch Marketing Campaign",
    description: "A task to launch a new marketing campaign.",
    endDate: formatInputDate(new Date("2024-12-01")),
    complete: false,
    collaborators: [
      { username: "Messi" },
      { username: "Ronaldo" },
      { username: "Neymar" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Task 1",
        description: "Description for task 1",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 2",
        description: "Description for task 2",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 3",
        description: "Description for task 3",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 4",
        description: "Description for task 4",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 5",
        description: "Description for task 5",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 6",
        description: "Description for task 6",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 7",
        description: "Description for task 7",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 8",
        description: "Description for task 8",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 9",
        description: "Description for task 9",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 10",
        description: "Description for task 10",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 11",
        description: "Description for task 11",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 12",
        description: "Description for task 12",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 13",
        description: "Description for task 13",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 14",
        description: "Description for task 14",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 15",
        description: "Description for task 15",
        state: "done",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Develop New Product",
    description: "A task to develop a new product.",
    endDate: formatInputDate(new Date("2025-06-01")),
    complete: false,
    collaborators: [
      { username: "Mbappe" },
      { username: "Salah" },
      { username: "Lewandowski" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Task 1",
        description: "Description for task 1",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 2",
        description: "Description for task 2",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 3",
        description: "Description for task 3",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 4",
        description: "Description for task 4",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 5",
        description: "Description for task 5",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 6",
        description: "Description for task 6",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 7",
        description: "Description for task 7",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 8",
        description: "Description for task 8",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 9",
        description: "Description for task 9",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 10",
        description: "Description for task 10",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 11",
        description: "Description for task 11",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 12",
        description: "Description for task 12",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 13",
        description: "Description for task 13",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 14",
        description: "Description for task 14",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 15",
        description: "Description for task 15",
        state: "done",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Develop New Website",
    description: "A task to develop a new website.",
    endDate: formatInputDate(new Date("2025-06-01")),
    complete: false,
    collaborators: [
      { username: "Messi" },
      { username: "Ronaldo" },
      { username: "Neymar" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Task 1",
        description: "Description for task 1",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 2",
        description: "Description for task 2",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 3",
        description: "Description for task 3",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 4",
        description: "Description for task 4",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 5",
        description: "Description for task 5",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 6",
        description: "Description for task 6",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 7",
        description: "Description for task 7",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 8",
        description: "Description for task 8",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 9",
        description: "Description for task 9",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 10",
        description: "Description for task 10",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 11",
        description: "Description for task 11",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 12",
        description: "Description for task 12",
        state: "done",
      },
      {
        id: uuidv4(),
        title: "Task 13",
        description: "Description for task 13",
        state: "todo",
      },
      {
        id: uuidv4(),
        title: "Task 14",
        description: "Description for task 14",
        state: "process",
      },
      {
        id: uuidv4(),
        title: "Task 15",
        description: "Description for task 15",
        state: "done",
      },
    ],
  },
  // ... more projects
];

export const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    taskIds: [],
  },

  {
    id: "process",
    title: "Process",
    taskIds: [],
  },

  {
    id: "done",
    title: "Done",
    taskIds: [],
  },
];
