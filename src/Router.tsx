import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Workdesk from "./pages/Workdesk"
import Workspace from "./pages/Workspace"
import Layout from "./layouts/Layout"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Workdesk />} index />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
