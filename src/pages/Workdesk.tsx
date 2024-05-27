import Project from "../components/Project";
import useTask from "../hooks/useTask";

export default function Workdesk() {
  const { projects } = useTask();
  return (
    <>
      <div>
        <section className="section container">
          <h1 className="section__title">Workdesk</h1>
          <div className="grid grid__container">
            {projects.map((project) => (
              <Project project={project} key={project.id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
