import { BiPlus } from "react-icons/bi"
import "../styles/CreateButton.css"
import useTask from "../hooks/useTask"

export default function CreateButton() {
  const { openProjectModal } = useTask()

  return (
    <button type="button" className="create__button" onClick={openProjectModal}>
      <BiPlus />
    </button>
  )
}
