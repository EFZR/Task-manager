import { ReactNode } from 'react'
import { BiX } from 'react-icons/bi'
import "../styles/Modal.css"

type ModalProps = {
  children: ReactNode,
  activeModal: Boolean,
  closeModal: () => void
}

export default function Modal({ children, activeModal, closeModal }: ModalProps) {
  return (
    <div className={`modal ${activeModal && "active__modal"}`}>
      <div className="modal-content">
        <BiX
          className="modal-close"
          onClick={closeModal} />
        {children}
      </div>
    </div>
  )
}
