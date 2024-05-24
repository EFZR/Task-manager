import { useReducer, createContext, ReactNode } from "react";
import { TaskReducer, initialState } from "../store/task";
import type { Project } from "../types";

export interface TaskContextProps {
  projects: Project[]
}

export const TaskContext = createContext<TaskContextProps>({
  projects: []
})

function TaskProvider({ children }: { children: ReactNode }) {
  //#region state

  const [state, _dispatch] = useReducer(TaskReducer, initialState)

  //#endregion

  //#region Functions

  //#endregion

  return (
    <TaskContext.Provider value={{
      projects: state.projects
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider