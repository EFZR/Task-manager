import { DragDropContext } from "@hello-pangea/dnd";
import useTask from "../hooks/useTask";
import KanbanList from "./KanbanList";
import "../styles/Kanban.css";

export default function Kanban() {
  const { currentProject, onDragEnd } = useTask();
  const { lists } = currentProject;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban__container grid">
        <div className="kanban__slider">
          {lists.map((list) => (
            <KanbanList
              key={list.id}
              title={list.title}
              id={list.id}
              tasks={list.tasks}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
