import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "../components/Header"
import ProjectModal from "../components/ProjectModal"
import CreateButton from "../components/CreateButton"
import "react-toastify/dist/ReactToastify.min.css"

export default function Layout() {
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
  )
}
