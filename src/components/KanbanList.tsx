import { ReactNode } from "react";
import { Droppable } from "@hello-pangea/dnd";
import "../styles/KanbanList.css";

type KanbanListProps = {
  children: ReactNode;
  name: string;
};

export default function KanbanList({ children, name }: KanbanListProps) {
  return (
    <Droppable droppableId={name}>
      {(provided, _snapshot) => (
        <div
          className="kanban__list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="kanban__list-header">
            <h3 className="kanban__list-title">{name}</h3>
          </div>
          <div className="kanban__container-card grid">{children}</div>
          <div className="kanban__list-footer">
            <button type="button" className="button kanban__footer-button">
              Add a Card
            </button>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
