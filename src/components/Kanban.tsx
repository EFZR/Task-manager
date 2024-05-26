import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import useTask from "../hooks/useTask";
import KanbanList from "./KanbanList";
import { List, Task } from "../types";
import "../styles/Kanban.css";

export default function Kanban() {
  const { currentProject, reorderLists, moveLists } = useTask();
  const { lists } = currentProject;
  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startList: List | undefined = lists.find(
      (list) => list.id === source.droppableId
    );
    const endList: List | undefined = lists.find(
      (list) => list.id === destination.droppableId
    );

    if (!startList || !endList) {
      throw new Error("Lists not found");
    }

    if (startList === endList) {
      const list = lists.find((list) => list.id === source.droppableId);
      const task = lists
        .find((list) => list.tasks.find((task) => task.id === draggableId))
        ?.tasks.find((task) => task.id === draggableId);

      if (!list) return;
      if (!task) return;

      const newTaskId = Array.from(list?.tasks || []);
      newTaskId.splice(source.index, 1);
      newTaskId.splice(destination.index, 0, task);

      const newList: List = {
        ...list,
        tasks: newTaskId,
      };

      reorderLists(newList);
      return;
    }

    // Moving from one list to other
    const startTasks: Task[] = startList.tasks;
    const task: Task | undefined = startTasks.find(
      (task) => task.id === draggableId
    );
    startTasks.splice(source.index, 1);
    const newStartList: List = {
      ...startList,
      tasks: startTasks,
    };


    if (!task) {
      throw new Error("Task not found");
    }

    const endTasks: Task[] = endList.tasks;
    endTasks.splice(destination.index, 0, task);
    const newFinishList: List = {
      ...endList,
      tasks: endTasks,
    };

    moveLists(newStartList, newFinishList);
  }

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
