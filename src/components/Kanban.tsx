import useTask from "../hooks/useTask";
import { BiPlus } from "react-icons/bi";
import "../styles/Kanban.css";

export default function Kanban() {
  const { currentProject } = useTask();
  const { tasks } = currentProject;

  return (
    <div className="kanban__container grid">
      <div className="kanban__slider">
        <div className="kanban__list grid">
          <div className="kanban__list-header">
            <h3 className="kanban__list-title">To Do</h3>
          </div>
          {tasks.map((task) => (
            <article className="kanban__card grid" key={task.id}>
              <div className="color__flag"></div>
              <h3 className="kanban__card-title">{task.title}</h3>
              <p>{task.description}</p>
            </article>
          ))}
          <div className="kanban__list-footer">
            <button type="button" className="kanban__card-button">
              <BiPlus className="kanban__card-icon" />
              Add a Card
            </button>
          </div>
        </div>
        <div className="kanban__list grid">
          <div className="kanban__list-header">
            <h3 className="kanban__list-title">In Process</h3>
          </div>
          {tasks.map((task) => (
            <article className="kanban__card grid" key={task.id}>
              <div className="color__flag"></div>
              <h3 className="kanban__card-title">{task.title}</h3>
              <p>{task.description}</p>
            </article>
          ))}
          {tasks.map((task) => (
            <article className="kanban__card grid" key={task.id}>
              <div className="color__flag"></div>
              <h3 className="kanban__card-title">{task.title}</h3>
              <p>{task.description}</p>
            </article>
          ))}
          <div className="kanban__list-footer">
            <button type="button" className="kanban__card-button">
              <BiPlus className="kanban__card-icon" />
              Add a Card
            </button>
          </div>
        </div>
        <div className="kanban__list grid">
          <div className="kanban__list-header">
            <h3 className="kanban__list-title">Done</h3>
          </div>
          {tasks.map((task) => (
            <article className="kanban__card grid" key={task.id}>
              <div className="color__flag"></div>
              <h3 className="kanban__card-title">{task.title}</h3>
              <p>{task.description}</p>
            </article>
          ))}
          <div className="kanban__list-footer">
            <button type="button" className="kanban__card-button">
              <BiPlus className="kanban__card-icon" />
              Add a Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
