import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import useTask from "../hooks/useTask";
import { formatDate } from "../helpers";
import type { Project } from "../types";
import "../styles/Project.css";

export default function Project({ project }: { project: Project }) {
  const { setCurrentProject, deleteProject, setActiveProject } = useTask();
  const [showOptions, setShowOptions] = useState<boolean>();
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <article className="project__card grid" key={project.id}>
      <h1 className="project__title">{project.name}</h1>
      <p>{project.description}</p>
      <span>{formatDate(project.endDate.toString())}</span>
      <Link
        to="/workspace"
        className="button"
        onClick={() => {
          setCurrentProject(project);
        }}
      >
        ver mas...
      </Link>
      <BiDotsVerticalRounded
        className="project__options"
        onClick={() => setShowOptions(true)}
      />
      <div
        ref={optionsRef}
        className={`project__options-display ${showOptions && "show"}`}
      >
        <button
          className="project__display-action"
          onClick={() => setActiveProject(project.id)}
        >
          Edit <BiPencil />
        </button>
        <button
          className="project__display-action"
          onClick={() => deleteProject(project.id)}
        >
          Delete <BiTrash />
        </button>
      </div>
    </article>
  );
}
