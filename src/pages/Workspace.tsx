import Kanban from "../components/Kanban";
import useTask from "../hooks/useTask";
import TaskModal from "../components/TaskModal";

export default function Workspace() {
  const { currentProject } = useTask();
  return (
    <>
      <div>
        <section className="section container">
          <h1 className="section__title">{currentProject.name}</h1>
          <Kanban />
        </section>
      </div>
      <TaskModal />
    </>
  );
}
