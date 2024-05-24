import { BiPlus } from "react-icons/bi"
import useUI from "../hooks/useUI"
import "../styles/CreateButton.css"

export default function CreateButton() {
  const { switchProjectModal } = useUI()
  return (
    <button type="button" className="create__button" onClick={switchProjectModal}>
      <BiPlus />
    </button>
  )
}
