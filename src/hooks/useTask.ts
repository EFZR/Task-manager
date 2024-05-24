import { useContext } from "react";
import { TaskContext, TaskContextProps } from "../context/TaskProvider";

function useTask(): TaskContextProps {
  return useContext(TaskContext)
}

export default useTask