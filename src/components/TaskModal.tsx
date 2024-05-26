import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import useTask from "../hooks/useTask";
import Modal from "./Modal";
import ErrorMessage from "./ErrorMessage";
import type { NewTask } from "../types";
import "../styles/TaskModal.css";

export default function TaskModal() {
  const {
    addTask,
    closeTaskModal,
    handleTaskForm,
    taskModal,
    activeTaskId,
    projects,
    taskForm,
  } = useTask();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Modal activeModal={taskModal} closeModal={closeTaskModal}>
      <h2 className="task__modal-title">New Task</h2>
      <form className="form grid">
        <div className="field">
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            placeholder=""
            value={taskForm.title}
            onChange={handleTaskForm}
          />
          <label htmlFor="title" className="label">
            Name
          </label>
        </div>
        <div className="field">
          <input
            type="text"
            id="description"
            name="description"
            autoComplete="off"
            placeholder=""
            value={taskForm.description}
            onChange={handleTaskForm}
          />
          <label htmlFor="description" className="label">
            Descriptions
          </label>
        </div>
        <input
          type="submit"
          value={"save"}
          className="submit button"
        />
      </form>
    </Modal>
  );
}
