import { BiPlus, BiPencil } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import useTask from "../hooks/useTask";
import "../styles/CreateButton.css";

export default function CreateButton() {
  const { openProjectModal, setActiveProject, currentProject } = useTask();
  const location = useLocation();

  return location.pathname === "/" ? (
    <button type="button" className="create__button" onClick={openProjectModal}>
      <BiPlus />
    </button>
  ) : (
    <button
      type="button"
      className="create__button"
      onClick={() => setActiveProject(currentProject.id)}
    >
      <BiPencil />
    </button>
  );
}
