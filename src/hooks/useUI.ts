import { useContext } from "react";
import { UiContext, UiContextProps } from "../context/UiProvider";

function useUI(): UiContextProps {
  return useContext(UiContext)
}

export default useUI