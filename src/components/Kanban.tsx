import { DragDropContext } from "@hello-pangea/dnd";
import { useCallback } from "react";
import useTask from "../hooks/useTask";
import KanbanList from "./KanbanList";
import KanbanCard from "./KanbanCard";
import "../styles/Kanban.css";

export default function Kanban() {
  const { currentProject } = useTask();
  const { tasks } = currentProject;
  const onDragEnd = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban__container grid">
        <div className="kanban__slider">
          <KanbanList name="To Do">
            {tasks.map((task, index) => {
              if (task.state === "todo")
                return <KanbanCard key={task.id} task={task} index={index} />;
            })}
          </KanbanList>
          <KanbanList name="Process">
            {tasks.map((task, index) => {
              if (task.state === "process")
                return <KanbanCard key={task.id} task={task} index={index} />;
            })}
          </KanbanList>
          <KanbanList name="Done">
            {tasks.map((task, index) => {
              if (task.state === "done")
                return <KanbanCard key={task.id} task={task} index={index} />;
            })}
          </KanbanList>
        </div>
      </div>
    </DragDropContext>
  );
}
