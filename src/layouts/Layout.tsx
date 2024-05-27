import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useTask from "../hooks/useTask";
import Header from "../components/Header";
import ProjectModal from "../components/ProjectModal";
import CreateButton from "../components/CreateButton";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";

export default function Layout() {
  const { currentProject, projects } = useTask();

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("current-project", JSON.stringify(currentProject));
  }, [currentProject]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CreateButton />
      <ProjectModal />
      <ToastContainer stacked />
    </div>
  );
}
