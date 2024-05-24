import { BiX } from "react-icons/bi"
import useUI from "../hooks/useUI"
import "../styles/ProjectModal.css"

export default function ProjectModal() {
  const { projectModal, switchProjectModal } = useUI()
  return (
    <div className={`project__modal ${projectModal && "active__modal"}`}>
      <div className="project__modal-content">
        <BiX
          className="project__modal-close"
          onClick={switchProjectModal} />
          <h2 className="project__modal-title">Project</h2>
      </div>
    </div>
  )
}
