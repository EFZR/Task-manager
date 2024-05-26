import { v4 as uuidv4 } from "uuid";
import { formatInputDate } from "../helpers";
import { List, Project } from "../types";

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
    lists: [
      {
        id: uuidv4(),
        title: "To Do",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 1",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 2",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 3",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 4",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 5",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Process",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 6",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 7",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 8",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 9",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 10",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 11",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 12",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 13",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 14",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 15",
            description: "Description for task 5",
          },
        ],
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
    lists: [
      {
        id: uuidv4(),
        title: "To Do",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 1",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 2",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 3",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 4",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 5",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Process",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 6",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 7",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 8",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 9",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 10",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 11",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 12",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 13",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 14",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 15",
            description: "Description for task 5",
          },
        ],
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
    lists: [
      {
        id: uuidv4(),
        title: "To Do",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 1",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 2",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 3",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 4",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 5",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Process",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 6",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 7",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 8",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 9",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 10",
            description: "Description for task 5",
          },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        tasks: [
          {
            id: uuidv4(),
            title: "Task 11",
            description: "Description for task 1",
          },
          {
            id: uuidv4(),
            title: "Task 12",
            description: "Description for task 2",
          },
          {
            id: uuidv4(),
            title: "Task 13",
            description: "Description for task 3",
          },
          {
            id: uuidv4(),
            title: "Task 14",
            description: "Description for task 4",
          },
          {
            id: uuidv4(),
            title: "Task 15",
            description: "Description for task 5",
          },
        ],
      },
    ],
  },
  // ... more projects
];

export const initialList: List[] = [
  {
    id: uuidv4(),
    title: "To Do",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "Process",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "Done",
    tasks: [],
  },
];
