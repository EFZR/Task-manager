import { useRef, useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { Task } from "../types";
import "../styles/KanbanCard.css";

type KanbanCardProps = {
  task: Task;
  index: number;
};

export default function KanbanCard({ task, index }: KanbanCardProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snaphot) => (
        <article
          className={`kanban__card grid ${
            snaphot.isDragging && "kanban__card-dragged"
          }`}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="color__flag"></div>
          <h3 className="kanban__card-title">{task.title}</h3>
          <p>{task.description}</p>
          <BiDotsVerticalRounded
            className="kanban__options"
            onClick={() => setShowOptions(!showOptions)}
          />
          <div
            ref={optionsRef}
            className={`kanban__options-display ${showOptions && "show"}`}
          >
            <div className="kanban__display-action">
              Edit <BiPencil />
            </div>
            <div className="kanban__display-action">
              Delete <BiTrash />
            </div>
          </div>
        </article>
      )}
    </Draggable>
  );
}
