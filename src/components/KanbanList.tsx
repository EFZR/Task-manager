import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";
import { List } from "../types";
import { Task } from "../types";
import "../styles/KanbanList.css";

type KanbanListProps = {
  id: List["id"];
  title: string;
  tasks: Task[];
};

export default function KanbanList({ id, title, tasks }: KanbanListProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, _snapshot) => (
        <div className="kanban__list">
          <div className="kanban__list-header">
            <h3 className="kanban__header-title">{title}</h3>
            <button className="kanban__header-button">new task</button>
          </div>
          <div
            className="kanban__container-card"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <KanbanCard index={index} task={task} key={task.id} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
