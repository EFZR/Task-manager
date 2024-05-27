import { FormEvent, useEffect, useMemo, useState } from "react";
import { BiX, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import useTask from "../hooks/useTask";
import Modal from "./Modal";
import { initialList } from "../data";
import type { Collaborator } from "../types";
import "../styles/ProjectModal.css";

export default function ProjectModal() {
  //#region States

  const {
    projects,
    projectModal,
    projectForm,
    currentProject,
    activeProjectId,
    addProject,
    addCollaborator,
    setCurrentProjectForm,
    removeCollaborator,
    handleProjectForm,
    closeProjectModal,
  } = useTask();

  const [inputCollaborators, setInputCollaborators] =
    useState<Collaborator["username"]>("");

  const hasCollaborators = useMemo(
    () => projectForm.collaborators.length > 0,
    [projectForm.collaborators]
  );

  const isUpdate = useMemo(() => activeProjectId !== "", [currentProject]);

  useEffect(() => {
    if (activeProjectId) {
      const currentProject = projects.find(
        (project) => project.id === activeProjectId
      );

      if (currentProject) {
        setCurrentProjectForm(currentProject);
      }
    }
  }, [activeProjectId]);

  //#endregion

  //#region Functions

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (Object.values(projectForm).includes("")) {
      toast.error("Please fill out all fields.");
      return;
    }
    addProject({
      ...projectForm,
      id: uuidv4(),
      complete: false,
      lists: initialList,
    });
    setInputCollaborators("");
    toast.success("Project created correctly, feel free creating new tasks.");
  }

  //#endregion

  return (
    <Modal activeModal={projectModal} closeModal={closeProjectModal}>
      <h2 className="project__modal-title">
        {isUpdate ? "Edit Project" : "New Project"}
      </h2>
      <form className="form grid" onSubmit={handleSubmit}>
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
