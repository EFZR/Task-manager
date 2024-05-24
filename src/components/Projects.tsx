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
          <button className="button">ver mas...</button>
        </article>
      ))}
    </div>
  )
}
