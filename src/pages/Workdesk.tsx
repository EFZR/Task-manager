import CreateButton from "../components/CreateButton"
import ProjectModal from "../components/ProjectModal"
import Projects from "../components/Projects"

export default function Workdesk() {
  return (
    <>
      <div>
        <section className="section container">
          <h1 className="section__title">Workdesk</h1>
          <Projects />
        </section>
      </div>
      <CreateButton />
      <ProjectModal />
    </>
  )
}
