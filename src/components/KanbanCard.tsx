import { useRef, useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import useTask from "../hooks/useTask";
import { List, Task } from "../types";
import "../styles/KanbanCard.css";

type KanbanCardProps = {
  task: Task;
  listId: List["id"];
  index: number;
};

export default function KanbanCard({ task, listId, index }: KanbanCardProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { setActiveTask, deleteTask } = useTask();

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
            onClick={() => setShowOptions(true)}
          />
          <div
            ref={optionsRef}
            className={`kanban__options-display ${showOptions && "show"}`}
          >
            <button
              className="kanban__display-action"
              onClick={() => setActiveTask(task.id, listId)}
            >
              Edit <BiPencil />
            </button>
            <button
              className="kanban__display-action"
              onClick={() => {
                deleteTask(task.id, listId);
                toast.success("Task deleted succesfully.");
              }}
            >
              Delete <BiTrash />
            </button>
          </div>
        </article>
      )}
    </Draggable>
  );
}
