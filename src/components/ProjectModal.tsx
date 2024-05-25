import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiX, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import useTask from "../hooks/useTask";
import Modal from "./Modal";
import ErrorMessage from "./ErrorMessage";
import type { Collaborator } from "../types";
import "../styles/ProjectModal.css";

export default function ProjectModal() {
  //#region States

  const {
    addProject,
    projectModal,
    closeProjectModal,
    handleProjectForm,
    projectForm,
    addCollaborator,
    removeCollaborator,
    currentProject,
    activeId,
    projects,
    setCurrentProjectForm,
  } = useTask();

  const [inputCollaborators, setInputCollaborators] =
    useState<Collaborator["username"]>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const hasCollaborators = useMemo(
    () => projectForm.collaborators.length > 0,
    [projectForm.collaborators]
  );

  const isUpdate = useMemo(() => activeId !== "", [currentProject]);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeId) {
      const currentProject = projects.find(
        (project) => project.id === activeId
      );

      if (currentProject) {
        setCurrentProjectForm(currentProject);
      }
    }
  }, [activeId]);

  //#endregion

  //#region Functions

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (Object.values(projectForm).includes("")) {
        throw new Error("Please ensure all fields are filled out correctly.");
      }
      addProject({ ...projectForm, id: uuidv4(), complete: false, tasks: [] });
      setInputCollaborators("");
      navigate("/workspace");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.log(error);
      }
    }
  }

  //#endregion

  return (
    <Modal activeModal={projectModal} closeModal={closeProjectModal}>
      <h2 className="project__modal-title">
        {isUpdate ? "Edit Project" : "New Project"}
      </h2>
      <form className="form grid" onSubmit={handleSubmit}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <div className="field">
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder=""
            value={projectForm.name}
            onChange={handleProjectForm}
          />
          <label htmlFor="name" className="label">
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
            value={projectForm.description}
            onChange={handleProjectForm}
          />
          <label htmlFor="description" className="label">
            Description
          </label>
        </div>

        <div className="field">
          <input
            type="date"
            id="endDate"
            name="endDate"
            autoComplete="off"
            placeholder=""
            value={projectForm.endDate}
            onChange={handleProjectForm}
          />
        </div>

        {/* TODO: Implement a menu for filtering users by name */}
        <div className="collaborator__container grid">
          <div className="field">
            <input
              type="text"
              id="collaborator"
              name="collaborator"
              autoComplete="off"
              placeholder=""
              value={inputCollaborators}
              onChange={(e) => setInputCollaborators(e.target.value)}
            />
            <BiPlus
              className="collaborator__icon"
              onClick={() => addCollaborator(inputCollaborators)}
            />
            <label htmlFor="collaborator" className="label">
              Collaborators
            </label>
            <div className="collaborator__container"></div>
          </div>

          {hasCollaborators && (
            <div className="collaborators__box">
              {projectForm.collaborators.map((collaborator, index) => (
                <div className="collaborator__item" key={index}>
                  <BiX
                    className="delete__item"
                    onClick={() => removeCollaborator(collaborator.username)}
                  />
                  {collaborator.username}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="submit"
          value={isUpdate ? "edit" : "save"}
          className="submit button"
        />
      </form>
    </Modal>
  );
}
