import { v4 as uuidv4 } from 'uuid';
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: uuidv4(),
    name: "Launch Marketing Campaign",
    description: "A task to launch a new marketing campaign.",
    endDate: new Date('2024-12-01'),
    complete: false,
    collaborators: [
      { username: "Neymar" },
      { username: "Mbappe" },
      { username: "Cavani" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Design Campaign",
        description: "Design the overall campaign"
      },
      {
        id: uuidv4(),
        title: "Create Content",
        description: "Create content for the campaign"
      },
      {
        id: uuidv4(),
        title: "Launch Campaign",
        description: "Launch the campaign"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Develop New Website",
    description: "A project to develop a new corporate website.",
    endDate: new Date('2024-10-15'),
    complete: false,
    collaborators: [
      { username: "Alice" },
      { username: "Bob" },
      { username: "Charlie" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Gather Requirements",
        description: "Gather requirements from stakeholders"
      },
      {
        id: uuidv4(),
        title: "Design UI/UX",
        description: "Design the user interface and user experience"
      },
      {
        id: uuidv4(),
        title: "Develop Backend",
        description: "Develop the backend of the website"
      },
      {
        id: uuidv4(),
        title: "Develop Frontend",
        description: "Develop the frontend of the website"
      },
      {
        id: uuidv4(),
        title: "Testing",
        description: "Test the website for bugs and issues"
      },
      {
        id: uuidv4(),
        title: "Deployment",
        description: "Deploy the website to the live server"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Organize Conference",
    description: "A project to organize an annual tech conference.",
    endDate: new Date('2024-09-20'),
    complete: false,
    collaborators: [
      { username: "Dave" },
      { username: "Eve" },
      { username: "Frank" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Select Venue",
        description: "Select and book the venue for the conference"
      },
      {
        id: uuidv4(),
        title: "Invite Speakers",
        description: "Invite speakers to the conference"
      },
      {
        id: uuidv4(),
        title: "Prepare Schedule",
        description: "Prepare the schedule for the conference"
      },
      {
        id: uuidv4(),
        title: "Market Event",
        description: "Market the event to potential attendees"
      },
      {
        id: uuidv4(),
        title: "Handle Logistics",
        description: "Manage the logistics of the conference"
      },
      {
        id: uuidv4(),
        title: "Conduct Event",
        description: "Conduct the conference"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Implement CRM System",
    description: "A project to implement a new CRM system.",
    endDate: new Date('2025-01-31'),
    complete: false,
    collaborators: [
      { username: "Grace" },
      { username: "Heidi" },
      { username: "Ivan" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Assess Requirements",
        description: "Assess the requirements for the CRM system"
      },
      {
        id: uuidv4(),
        title: "Select CRM Software",
        description: "Select the appropriate CRM software"
      },
      {
        id: uuidv4(),
        title: "Plan Implementation",
        description: "Plan the implementation process"
      },
      {
        id: uuidv4(),
        title: "Migrate Data",
        description: "Migrate existing data to the new CRM system"
      },
      {
        id: uuidv4(),
        title: "Train Staff",
        description: "Train staff on how to use the new CRM system"
      },
      {
        id: uuidv4(),
        title: "Go Live",
        description: "Launch the CRM system for everyday use"
      },
      {
        id: uuidv4(),
        title: "Monitor and Optimize",
        description: "Monitor the system and optimize as needed"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Product Launch",
    description: "A project to launch a new product line.",
    endDate: new Date('2024-11-30'),
    complete: false,
    collaborators: [
      { username: "Jack" },
      { username: "Kathy" },
      { username: "Leo" },
    ],
    tasks: [
      {
        id: uuidv4(),
        title: "Market Research",
        description: "Conduct market research for the new product"
      },
      {
        id: uuidv4(),
        title: "Product Design",
        description: "Design the new product"
      },
      {
        id: uuidv4(),
        title: "Manufacturing",
        description: "Oversee the manufacturing process"
      },
      {
        id: uuidv4(),
        title: "Marketing Campaign",
        description: "Create and launch the marketing campaign"
      },
      {
        id: uuidv4(),
        title: "Launch Event",
        description: "Organize the product launch event"
      },
      {
        id: uuidv4(),
        title: "Post-Launch Review",
        description: "Review the product launch and gather feedback"
      }
    ]
  }
];
