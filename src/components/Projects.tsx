import { Link } from "react-router-dom";
import useTask from "../hooks/useTask"
import { formatDate } from "../helpers";
import "../styles/Projects.css"

export default function Projects() {
  const { projects } = useTask()

  return (
    <div className="tasks__container grid">
      {projects.map(project => (
        <article className="task__card grid" key={project.id}>
          <h1 className="task__title">
            {project.name}
          </h1>
          <p>
            {project.description}
          </p>
          <span>
            {formatDate(project.endDate.toString())}
          </span>
          <Link to="/workspace" className="button">ver mas...</Link>
        </article>
      ))}
    </div>
  )
}
