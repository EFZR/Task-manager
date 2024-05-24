import { useReducer, createContext, ReactNode } from "react";
import { TaskReducer, initialState } from "../store/task";

export interface TaskContextProps { }

export const TaskContext = createContext<TaskContextProps>({})

function TaskProvider({ children }: { children: ReactNode }) {
  //#region state

  const [_state, _dispatch] = useReducer(TaskReducer, initialState)

  //#endregion

  //#region Functions

  //#endregion

  return (
    <TaskContext.Provider value={{}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider