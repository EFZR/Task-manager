import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import ProjectModal from "../components/ProjectModal"
import CreateButton from "../components/CreateButton"

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CreateButton />
      <ProjectModal />
    </div>
  )
}
