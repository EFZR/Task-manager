import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types";
import "../styles/KanbanCard.css";

type KanbanCardProps = {
  task: Task;
  index: number;
};

export default function KanbanCard({ task, index }: KanbanCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, _snaphot) => (
        <article
          className="kanban__card grid"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="color__flag"></div>
          <h3 className="kanban__card-title">{task.title}</h3>
          <p>{task.description}</p>
        </article>
      )}
    </Draggable>
  );
}
