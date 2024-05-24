import { ReactNode, createContext, useReducer } from "react";
import { UiReducer, initialState } from "../store/ui";

export interface UiContextProps {
  toggle: Boolean,
  theme: Boolean,
  projectModal: Boolean,
  switchTheme: () => void,
  switchToggle: () => void,
  switchProjectModal: () => void,
}

export const UiContext = createContext<UiContextProps>({
  toggle: false,
  theme: false,
  projectModal: false,
  switchProjectModal: () => { },
  switchTheme: () => { },
  switchToggle: () => { }
})

function UiProvider({ children }: { children: ReactNode }) {
  //#region states

  const [state, dispatch] = useReducer(UiReducer, initialState)

  //#endregion

  //#region Functions

  function switchTheme() {
    dispatch({ type: "switch-theme" })
  }

  function switchToggle() {
    dispatch({ type: "switch-toggle" })
  }

  function switchProjectModal() {
    dispatch({ type: "switch-project-modal" })
  }

  //#endregion

  return (
    <UiContext.Provider value={{
      theme: state.theme,
      toggle: state.toggle,
      projectModal: state.projectModal,
      switchProjectModal,
      switchTheme,
      switchToggle
    }}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider